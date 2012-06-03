# coding: utf-8

class EnqPagesController < ApplicationController

  def index
    a = EnqFace.all
    render :json => a.to_json
  end

  def show
    msg = "<html><body><h1>Hello</h1><p>#{params[:enq_id]}/#{params[:id]}</p></body></html>"
    render :text => msg
  end
end
