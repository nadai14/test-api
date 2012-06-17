#coding: utf-8
require 'spec_helper'
require 'support/custom_machers'
require "json/pure" # gem install json_pure

describe AnswersController do
  describe "回答送信機能テスト" do
    fixtures :enqs, :enq_faces, :enq_pages, :enq_questions, :choices, :branches, :questions, :answers, :campaigns
    render_views
    
    before do
      request.env['X-Requested-By'] = 'poncan-moviereward'
    end
    
    context "指定されたページヘのルートが正しく設定されているか" do
      context "/api/v1/enqs/1001/pages/1/campaigns/100/answers" do
        describe :routes do
          subject{{:post => "/api/v1/enqs/1001/pages/1/campaigns/100/answers"}}
          it{should route_to(controller: "answers", action: "create", enq_id: "1001", page_id: "1", campaign_id: "100", format: :json)}
        end
      end
      
      before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
             session_id: "session_id", uid: "uid", key: "mixi_uid", answer_1: "男性", answer_2: 24, format: :json}}
      
      describe :response do
        subject{response}
        it{should be_success}
      end
    end

    context "回答を送信する" do
      describe "回答は正しく登録されるか" do
        before do
          @answer = ['男性',24]
          @uid = "uid"
          post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
                         session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: @answer[0], answer_2: @answer[1], format: :json}
        end

        it 'レスポンスフォーマットの確認' do
          response.should be_success
          response.content_type.should == Mime::JSON
        end

        it 'カラムの確認' do
          [:enq_id, :enq_page_id, :campaign_id].each do |key|
            response.body.should have_json("/#{key}")
          end
        end
        
        it 'レスポンスの表示(目検用)' do
          puts "response_body: #{response.body}"
        end
        
        it '回答の登録の確認' do
          result = Answer.find(:all,
                        :conditions => ["campaign_id = ? and enq_question_id = ? and user_id = ?", campaigns(:success_confirm).id, enq_questions(:scPCquestion1), @uid]
                        )
          result.length.should == 1
          result[0]["answer"].should == @answer[0].to_s
          
          result = Answer.find(:all,
                        :conditions => ["campaign_id = ? and enq_question_id = ? and user_id = ?", campaigns(:success_confirm).id, enq_questions(:scPCquestion2), @uid]
                        )
          result.length.should == 1
          result[0]["answer"].should == @answer[1].to_s
        end
      end
      
      describe "異常系は動作しているか" do
        before do
          @answer = ['男性',24]
          @uid = "uid"
        end
      
        context "認可されていない時" do
          describe :response do
            before do
              request.env['X-Requested-By'] = 'failed_request'
              post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
                             session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: @answer[0], answer_2: @answer[1], format: :json}
            end
            
            it 'status 401(UnauthorizedException) を返す' do
              response.status.should == 401
            end
          end
        end
        
        context "アンケートIDが存在しない時" do
          before{post :create, {enq_id: "failed_id", page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
                                session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: @answer[0], answer_2: @answer[1], format: :json}}
        
          it 'status 404(NotFoundException) を返す' do
            response.status.should == 404
          end
        end
        
        context "ページIDが存在しない時" do
          before{post :create, {enq_id: enqs(:status1).id, page_id: "failed_id", campaign_id: campaigns(:success_confirm).id,
                                session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: @answer[0], answer_2: @answer[1], format: :json}}
        
          it 'status 404(NotFoundException)　を返す' do
            response.status.should == 404
          end
        end
        
        context "キャンペーンIDとアンケートIDが矛盾している" do
          before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:nullable).id,
                                session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: @answer[0], answer_2: @answer[1], format: :json}}
        
          it 'status 404(NotFoundException) を返す' do
            response.status.should == 404
          end
        end
        
        context "アンケートIDとページIDが矛盾している" do
          before{post :create, {enq_id: enqs(:nullable).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
                                session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: @answer[0], answer_2: @answer[1], format: :json}}
        
          it 'status 404(NotFoundException) を返す' do
            response.status.should == 404
          end
        end

        context "アンケートページと回答の設問番号が矛盾している" do
          before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page3_1).id, campaign_id: campaigns(:success_confirm).id,
                                session_id: "session_id", uid: @uid, key: "mixi_uid", answer_1: "文章です", format: :json}}
        
          it 'status 404(NotFoundException) を返す' do
            response.status.should == 404
          end
        end

        context "設問種類が数値入力で、文字列が入力される" do
          before{post :create, {enq_id: enqs(:status1).id, page_id: enq_pages(:sc_PC_page1).id, campaign_id: campaigns(:success_confirm).id,
             session_id: "session_id", uid: "uid", key: "mixi_uid", answer_1: "男性", answer_2: "validate", format: :json}}
        
          it 'status 400(BadRequestException) を返す' do
            response.status.should == 400
          end
        end
      end
    end
  end
end
