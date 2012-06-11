#coding: utf-8
require 'spec_helper'
require 'support/custom_machers'

describe EnqsController do
  fixtures :enqs, :enq_faces

  describe "アンケート情報取得機能テスト" do
	before do
	  request.env['HTTP_X_REQUESTED_WITH'] = 'poncan-moviereward'
	end
  
	context "ルートが正しく設定されているか" do
	  describe :routes do
		subject{{:get => "/api/v1/enqs/1"}}
		it{should route_to(controller: "enqs", action: "show", id: "1")}
	  end
	  
	  before{get :show, {id: "enq1", face: "TO"}}
	  
	  describe :response do
		subject{response}
		it{should be_success}
	  end
	end

	context "UUIDとフェイスから値を取得する" do
	  describe "レスポンスは正しく返ってきているか" do
		before {get :show,{id: enqs(:status1), face: "PC"}}

		it 'レスポンスフォーマットの確認' do
		  response.content_type.should == Mime::JSON
		  response.should be_success
		end

		it 'レスポンスの値の確認' do
		  response.body.should have_json("/api/v1/enqs/uuid") 
		  response.body.should have_json("/api/v1/enqs/enq_pages/first_page_id") 
		  response.body.should have_json("/api/v1/enqs/enq_pages/wait_until") 
		  response.body.should have_json("/api/v1/enqs/enq_pages/css") 
		  response.body.should have_json("/api/v1/enqs/movie") 
		  response.body.should have_json("/api/v1/enqs/thumbnail") 
		  response.body.should have_json("/api/v1/enqs/point") 
		  response.body.should have_json("/api/v1/enqs/title") 
		  response.body.should have_json("/api/v1/enqs/description") 
		  response.body.should have_json("/api/v1/enqs/message") 
		  response.body.should have_json("/api/v1/enqs/conversion_tag") 
		  response.body.should have_json("/api/v1/enqs/second_picture") 
		  response.body.should have_json("/api/v1/enqs/second_point") 
		  response.body.should have_json("/api/v1/enqs/client_url") 
		end
	  end
	end
  end
end
