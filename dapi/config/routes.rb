# coding: utf-8
Dapi::Application.routes.draw do
  scope "api/v1" do
    # アンケート情報取得URL
	# ~/api/v1/enqs/:enq.uuid
	# ~/api/v1/enqs/:enq.uuid?face=:enq_face
    get 'enqs/:uuid' => 'enqs#show'
	
	# 動作はshowのみ
    resources :enqs, :only => ['show']
  end
end
