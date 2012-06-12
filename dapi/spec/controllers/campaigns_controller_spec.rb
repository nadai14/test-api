#coding: utf-8
require 'spec_helper'
require 'support/custom_machers'

describe CampaignsController do
  describe "キャンペーン情報取得機能テスト" do
	fixtures :campaigns, :enq_faces, :enqs
	render_views
 
	context "ルートが正しく設定されているか" do
	  before do
		request.env['HTTP_X_REQUESTED_WITH'] = 'poncan-moviereward'
	  end

	  describe :routes do
		subject{{:get => "/api/v1/campaigns/1"}}
		it{should route_to(controller: "campaigns", action: "show", id: "1", format: :json)}
	  end
	  
	  before{get :show, {id: campaigns(:success_confirm).id, face: "TO", format: :json}}
	  
	  describe :response do
		subject{response}
		it{should be_success}
	  end
	end

	context "UUIDとフェイスから値を取得する" do
	  before do
		request.env['HTTP_X_REQUESTED_WITH'] = 'poncan-moviereward'
	  end

	  describe "レスポンスは正しく返ってきているか" do
		before {get :show,{id: campaigns(:success_confirm), face: "PC", format: :json}}

		it 'レスポンスフォーマットの確認' do
		  response.should be_success
		  response.content_type.should == Mime::JSON
		end

		it 'カラムの確認' do
		  [:uuid, :enq_id, :platform, :first_page_id, :wait_until, :css, :movie, :thumbnail, :point,
				:title, :description, :message, :conversion_tag, :second_picture, :second_point, :client_url].each do |key|
			response.body.should have_json("/#{key}") 
		  end
		end
		
		it 'レスポンスの表示(目検用)' do
		  puts "目検用response_body: #{response.body}"
		end
	  end
	  
	  describe "異常系は動作しているか" do
		context "認可されていない時" do
		  describe :response do
			before{get :show, {id: campaigns(:success_confirm).id, face: "TO", format: :json}}
			
			it 'stasut 401(UnauthorizedException) を返す' do
			  response.status.should == 401
			end
		  end
		end
		
		before do
		  request.env['HTTP_X_REQUESTED_WITH'] = 'poncan-moviereward'
		end
		
		context "キャンペーンIDが存在しない時" do
		  before{get :show, {id: "Unknown_id", face: "TO", format: :json}}
		
		  it 'stasut 404(NotFoundException) を返す' do
			response.status.should == 404
		  end
		end
		
		context "status == 0 状態が入稿前の時" do
		  before{get :show, {id: campaigns(:status0).id, face: "TO", format: :json}}
		
		  it 'stasut 403(ForbiddenException を返す)' do
			response.status.should == 403
		  end
		end
		
		context "status == 1 で状態が終了の時" do
		  before{get :show, {id: campaigns(:status9).id, face: "TO", format: :json}}
		
		  it 'stasut 403(ForbiddenException) を返す' do
			response.status.should == 403
		  end
		end
		
		context "closed_date の時間を超えている" do
		  before{get :show, {id: campaigns(:closed).id, face: "TO", format: :json}}
		
		  it 'stasut 403(ForbiddenException) を返す' do
			response.status.should == 403
		  end
		end
	  end
	end
  end
end