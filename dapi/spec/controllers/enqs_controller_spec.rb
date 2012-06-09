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

	context "UUIDとフェイスから値を取得できるか" do
	  fixtures :enqs, :enq_faces

	  before do
		@enq = Enq.find(:first)
		@face = 'TO'
	  end

	  it 'データを取得してレスポンスしていること' do
		get :show,{id: @enq.id, face: @face}
		puts "enq id: #{@enq.id}, face: #{@face}"
		response.body.should have_json("/api/v1/enqs/id") 
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
		response.body.should have_json("/api/v1/enqs/first_page_id") 
		response.body.should have_json("/api/v1/enqs/wait_until") 
		response.body.should have_json("/api/v1/enqs/css") 
	  end
	end
  end
end
