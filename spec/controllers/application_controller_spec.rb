#coding: utf-8
require 'spec_helper'

class ApplicationControllerDummy < ApplicationController; end

describe ApplicationController do
  controller ApplicationControllerDummy do
    def index
      head :no_content
    end
	
	def error
      response.headers['Access-Control-Allow-Origin'] = '*'
      response.headers['Access-Control-Allow-Headers'] = 'X-Requested-By'
	end
  end
  
  describe "認証機能テスト" do
    before {Rails.env = 'development'}
  
    context "正常に認証されるか" do
      it 'リクエストヘッダを認証しているか' do
        request.env['X-Requested-By'] = 'poncan-moviereward'
        get :index
        response.should be_success
      end
    end

    describe "異常系は動作しているか" do
      context "ヘッダに誤りがあった時" do
        it 'status 401(UnauthorizedException) を返すか' do
          request.env['X-Requested-By'] = 'poncan-movie'
          get :index
          response.status.should == 401
        end
      end
      
      context "サーバ内部で異常があった場合" do
        it 'status 500(Internal Server Error) を返すか' do
          request.env['X-Requested-By'] = 'poncan-moviereward'
		  stub_request(:check_requested_by, "www.example.com").to_return(:status => [500, "Internal Server Error"])

		  req = Net::HTTP::Get.new("/")
		  Net::HTTP.start("www.example.com") { |http| http.request(req) }.message # ===> "Internal Server Error"
		  
		  #get :index
          #response.status.should == 204
        end
      end
    end
  end
end
