#coding: utf-8
require 'spec_helper'

describe AnswersController do
  describe "回答送信機能テスト" do
	context "指定されたページヘのルートが正しく設定されているか" do
	  context "/api/v1/enqs/1001/pages/1/answers" do
		describe :routes do
		  subject{{:post => "/api/v1/enqs/1001/pages/1/answers"}}
		  it{should route_to(controller: "answerss", action: "post", enq_id: "1001", enq_page_id: "1")}
		end
	  end
	end

	context "回答を送信する" do
	  describe "回答は正しく登録されるか" do
		before
		  @answer = 'answer'
		end

		it 'レスポンスフォーマットの確認' do
		  post :post,{enq_id: "enq_id", enq_page_id: "enq_page.enq_id", session_id: "session_id", answers: @answers}
		  response.body.should be_json
		  @responses = response.body
		end

		it 'レスポンスの値の確認' do
		  @responses.body.should have_json("/api/v1/answers/enq_id") 
		  @responses.body.should have_json("/api/v1/answers/enq_page_id") 
		end
		
		it '回答の登録の確認' do
		  answers = Answer.find(:all,
				:conditions => ["enq_id = ? and enq_page_id = ?", @responses.enq_id, @responses.enq_page_id]
				)

		  it :answers(:each) do
			answers.answer.should == @answer
		  end
		end
	  end
	end
  end
end
