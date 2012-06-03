# coding: utf-8

class EnqsController < ApplicationController

  def show
    enq = Enq.find_by_uuid(params[:id])
    render :json => enq.to_json(:include => :enq_faces)
  end

end
