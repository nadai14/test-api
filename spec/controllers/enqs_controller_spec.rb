#coding: utf-8
require 'spec_helper'

describe EnqsController do
  describe "アンケート情報取得機能テスト" do
	context "ルートが正しく設定されているか" do
	  describe :routes do
		subject{{:get => "/api/v1/enqs/1"}}
		it{should route_to(controller: "enqs", action: "show", id: "1")}
	  end
	end

	context "UUIDとフェイスから値を取得する" do
	  fixtures :enqs, :enq_faces
	  
	  describe "レスポンスは正しく返ってきているか" do
		before do
		  @enq = Enq.find(:first)
		  @face = 'TO'
		end

		it 'レスポンスフォマットの確認' do
		  get :show,{id: @enq.id, face: @face}
		  response.body.should be_json
		  @responses = response.body
		end

		it 'レスポンスの値の確認' do
		  @responses.body.should have_json("/api/v1/enqs/uuid") 
		  @responses.body.should have_json("/api/v1/enqs/first_page_id") 
		  @responses.body.should have_json("/api/v1/enqs/wait_until") 
		  @responses.body.should have_json("/api/v1/enqs/css") 
		  @responses.body.should have_json("/api/v1/enqs/movie") 
		  @responses.body.should have_json("/api/v1/enqs/thumbnail") 
		  @responses.body.should have_json("/api/v1/enqs/point") 
		  @responses.body.should have_json("/api/v1/enqs/title") 
		  @responses.body.should have_json("/api/v1/enqs/description") 
		  @responses.body.should have_json("/api/v1/enqs/message") 
		  @responses.body.should have_json("/api/v1/enqs/conversion_tag") 
		  @responses.body.should have_json("/api/v1/enqs/second_picture") 
		  @responses.body.should have_json("/api/v1/enqs/second_point") 
		  @responses.body.should have_json("/api/v1/enqs/client_url") 
		end
	  end
	end
  end
end
