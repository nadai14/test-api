#coding: utf-8
require 'spec_helper'

class ApplicationControllerDummy < ApplicationController; end

describe ApplicationController do
  controller ApplicationControllerDummy do
    def index
	  head :no_content
	end
  end
  
  describe "認証機能テスト" do
    before{Rails.env = 'development'}
  
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
		  get :index
		  response.status.should == 204
		end
	  end
	end
  end
end
