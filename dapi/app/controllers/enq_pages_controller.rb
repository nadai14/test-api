class EnqPagesController < ApplicationController
  # GET /enq_pages/1
  # GET /enq_pages/1.json
  def getEnqPage
    @enq_pages = EnqPage.find(:first,
	  :include => [{:enq => [{:enq_questions => [:question => :choices]}, :answers]}, :branches],
	  :conditions => ["page_id = ? or enq_id = ?", params[:id], 1],
	  :select => "enq_id, page_id, description, enq_questions.num, interval, questions.kind, questions.title, questions.content,
					questions.required, choices.choice_id, choices.content, branches.answer, branches.page_id, questions.answer_content,
					questions.answer_description"
	  )

    respond_to do |format|
      if @enq_page
	    @enq_page_result = true		
        format.html  { render :html => @enq_page }
        format.json  { render :json => [@enq_page, @enq_page_result] }
      else
	    @enq_page_result = false
		@err_msg = 'get errot'
        format.html  { render :action => "index" }
        format.json  { render :json => [@enq_page.errors, @enq_page_result, @err_msg]}
      end
    end
  end
  
  # GET /enq_pages
  # GET /enq_pages.json
  def index
    @enq_pages = EnqPage.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @enq_pages }
    end
  end

  # GET /enq_pages/1
  # GET /enq_pages/1.json
  def show
    @enq_page = EnqPage.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @enq_page }
    end
  end

  # GET /enq_pages/new
  # GET /enq_pages/new.json
  def new
    @enq_page = EnqPage.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @enq_page }
    end
  end

  # GET /enq_pages/1/edit
  def edit
    @enq_page = EnqPage.find(params[:id])
  end

  # POST /enq_pages
  # POST /enq_pages.json
  def create
    @enq_page = EnqPage.new(params[:enq_page])

    respond_to do |format|
      if @enq_page.save
        format.html { redirect_to @enq_page, notice: 'Enq page was successfully created.' }
        format.json { render json: @enq_page, status: :created, location: @enq_page }
      else
        format.html { render action: "new" }
        format.json { render json: @enq_page.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /enq_pages/1
  # PUT /enq_pages/1.json
  def update
    @enq_page = EnqPage.find(params[:id])

    respond_to do |format|
      if @enq_page.update_attributes(params[:enq_page])
        format.html { redirect_to @enq_page, notice: 'Enq page was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @enq_page.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /enq_pages/1
  # DELETE /enq_pages/1.json
  def destroy
    @enq_page = EnqPage.find(params[:id])
    @enq_page.destroy

    respond_to do |format|
      format.html { redirect_to enq_pages_url }
      format.json { head :no_content }
    end
  end
end
