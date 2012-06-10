#coding: utf-8
require 'spec_helper'

describe EnqPagesController do
  describe "アンケートページ情報取得機能テスト" do
	context "指定されたページヘのルートが正しく設定されているか" do
	  context "/api/v1/enqs/1001/pages/1" do
	  describe :routes do
		subject{{:get => "/api/v1/enqs/1001/pages/1"}}
		it{should route_to(controller: "enq_pages", action: "show", enq_id: "1001", uuid: "1")}
	  end

	  context "/api/v1/enqs/1001/pages/first" do
	  describe :routes do
		subject{{:get => "/api/v1/enqs/1001/pages/first"}}
		it{should route_to(controller: "enq_pages", action: "show", enq_id: "1001", uuid: "first")}
	  end
	end

	context "UUIDとフェイスから値を取得する" do
	  fixtures :enqs, :enq_faces, :enq_pages, :enq_questions, :branches, :quetions, :choices, :answers
	  
	  describe "レスポンスは正しく返ってきているか" do
		before do
		  @enq_page = EnqPage.find(:first)
		end

		it 'レスポンスフォマットの確認' do
		  get :show,{uuid: @enq_page.id, enq_id: @enq_page.enq_id, face: @enq_page.face}
		  response.body.should be_json
		  @responses = response.body
		end

		it 'レスポンスの値の確認' do
		  @responses.body.should have_json("/api/v1/enq_pages/enq_id") 
		  @responses.body.should have_json("/api/v1/enq_pages/uuid") 
		  @responses.body.should have_json("/api/v1/enq_pages/description") 
		  @responses.body.should have_json("/api/v1/enq_pages/question_num") 
		  @responses.body.should have_json("/api/v1/enq_pages/question_cnt") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/num") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/seq") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/kind") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/title") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/content") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/required") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/choice/uuid") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/choice/content") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/branch/answer") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/branch/next_page_id") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/branch/wait_until") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/answer/content") 
		  @responses.body.should have_json("/api/v1/enq_pages/question/branch/description") 
		  @responses.body.should have_json("/api/v1/enq_pages/next_page_id") 
		  @responses.body.should have_json("/api/v1/enq_pages/wait_until") 
		end
	  end
	end
  end
end
