# coding: utf-8

class EnqPagesController < ApplicationController
  def show
    msg = "<html><body><h1>Hello</h1><p>#{params[:enq_id]}/#{params[:id]}</p></body></html>"
    render :text => msg
  end
end
