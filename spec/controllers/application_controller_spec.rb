#coding: utf-8
require 'spec_helper'

describe ApplicationController do
  describe "認証機能テスト" do
	context "正常に認証されるか" do
	  post :post{header: "ponkan-movie-reward"}
	  it{response.should have the correct authorization UPI}
	end
  end
end
