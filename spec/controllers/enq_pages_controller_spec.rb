#coding: utf-8
require 'spec_helper'

describe EnqPagesController do
  describe "アンケートページ情報取得機能テスト" do
	fixtures :enqs, :enq_faces, :enq_pages, :enq_questions, :choices, :branches, :questions, :answers, :campaigns
  
	before do
	  request.env['HTTP_X_REQUESTED_WITH'] = 'ponkan-moviereward'
	end
  
	context "指定されたページヘのルートが正しく設定されているか" do
	  context "/api/v1/enqs/1001/pages/1" do
		describe :routes do
		  subject{{:get => "/api/v1/enqs/1001/pages/1"}}
		  it{should route_to(controller: "enq_pages", action: "show", enq_id: "1001", id: "1", format: :json)}
		end
	  end

	  context "/api/v1/enqs/1001/pages/first" do
		describe :routes do
		  subject{{:get => "/api/v1/enqs/1001/pages/first"}}
		  it{should route_to(controller: "enq_pages", action: "first", enq_id: "1001", format: :json)}
		end
	  end
	end

	context "UUIDとフェイスから値を取得する" do
	  describe "レスポンスは正しく返ってきているか" do
		before{get :show,{id: enq_pages(:e1TOpage1).uuid, enq_id: enq_faces(:enq1TO).enq_id, face: enq_faces(:enq1TO).face}}
		
		it 'レスポンスフォーマットの確認' do
		  response.content_type.should == Mime::JSON
		  puts "response: #{response.body}"
		end

		it 'レスポンスの値の確認' do
		  response.body.should have_json("/api/v1/enq_pages/enq_id") 
		  response.body.should have_json("/api/v1/enq_pages/uuid") 
		  response.body.should have_json("/api/v1/enq_pages/description") 
		  response.body.should have_json("/api/v1/enq_pages/question_num") 
		  response.body.should have_json("/api/v1/enq_pages/question_cnt") 
		  response.body.should have_json("/api/v1/enq_pages/question/num") 
		  response.body.should have_json("/api/v1/enq_pages/question/seq") 
		  response.body.should have_json("/api/v1/enq_pages/question/kind") 
		  response.body.should have_json("/api/v1/enq_pages/question/title") 
		  response.body.should have_json("/api/v1/enq_pages/question/content") 
		  response.body.should have_json("/api/v1/enq_pages/question/required") 
		  response.body.should have_json("/api/v1/enq_pages/question/choice/uuid") 
		  response.body.should have_json("/api/v1/enq_pages/question/choice/content") 
		  response.body.should have_json("/api/v1/enq_pages/question/branch/answer") 
		  response.body.should have_json("/api/v1/enq_pages/question/branch/next_page_id") 
		  response.body.should have_json("/api/v1/enq_pages/question/branch/wait_until") 
		  response.body.should have_json("/api/v1/enq_pages/question/answer/content") 
		  response.body.should have_json("/api/v1/enq_pages/question/branch/description") 
		  response.body.should have_json("/api/v1/enq_pages/next_page_id") 
		  response.body.should have_json("/api/v1/enq_pages/wait_until") 
		end
	  end
	end
  end
end
