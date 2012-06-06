# coding: utf-8
Dapi::Application.routes.draw do
  scope "api/v1" do
    # アンケート情報取得URL
    get 'enqs/:uuid' => 'enqs#show'
	
	# 動作はshowのみ
    resources :enqs, :only => ['show']
  end
end
