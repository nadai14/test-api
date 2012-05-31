class EnqPagesController < ApplicationController
  # GET /enq_pages/1
  # GET /enq_pages/1.json
  def get
    @enq_pages = EnqPage.find(:first,
	  :conditions => ["page_id = ? or enq_id = ?", params[:id], 1],#params[:enq_id]],
	  :select => "enq_id, page_id, description, 'interval'"
	  )

    @enq_questions = EnqQuestion.find(:first,
	  :conditions => ["enq_id = ?", 1],#params[:enq_id]],
	  :select => "num"
	  )

    @questions = Question.find(:first,
	  :conditions => ["question_id = ?", @enq_questions.num],
	  :select => "kind, title, content, required, answer_content, answer_description"
	  )

    @choices = Choice.find(:first,
	  :conditions => ["question_id = ?", @enq_questions.num],
	  :select => "choice_id, content"
	  )

    @branches = Branch.find(:first,
	  :conditions => ["page_id = ? or enq_id = ?", params[:id], 1],#params[:enq_id]],
	  :select => "answer, page_id"
	  )


	  
#    @enq_pages = EnqPage.find(:first,
#	  :include => [{:enq => [{:enq_questions => [:question => :choices]}, :answers]}, :branches],
#	  :conditions => ["page_id = ? or enq_id = ?", params[:id], 1],
#	  :select => "enq_id, page_id, description, enq_questions.num, interval, questions.kind, questions.title, questions.content,
#					questions.required, choices.choice_id, choices.content, branches.answer, branches.page_id, questions.answer_content,
#					questions.answer_description"
#	  )
	
    respond_to do |format|
      if (@enq_pages and @enq_questions and @questions and @choices and @branches)
	    @enq_page_result = true		
        #format.html { redirect_to(@enqs, :notice => 'Enq was successfully created.') }
        format.json  { render :json => [@enq_pages, @enq_questions, @questions, @choices, @branches, @enq_page_result] }
      else
	    @enq_page_result = false
		@err_msg = 'get errot'
        #format.html { render :action => "index" }
        format.json  { render :json => [@enq_pages.errors, @enq_questions.errors, @questions.errors, @choices.errors, @branches.errors, @enq_page_result, @err_msg]}
      end
    end
  end
  
  # GET /enq_pages
  # GET /enq_pages.xml
  def index
    @enq_pages = EnqPage.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @enq_pages }
    end
  end

  # GET /enq_pages/1
  # GET /enq_pages/1.xml
  def show
    @enq_pages = EnqPage.find(:first,
	  :include => [{:enq => [{:enq_questions => [:question => :choices]}, :answers]}, :branches],
	  :conditions => ["page_id = ? or enq_id = ?", params[:id], 1],
	  :select => "enq_id, page_id, description, enq_questions.num, interval, questions.kind, questions.title, questions.content,
					questions.required, choices.choice_id, choices.content, branches.answer, branches.page_id, questions.answer_content,
					questions.answer_description"
	  )
	
    @enq_page = EnqPage.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @enq_page }
    end
  end

  # GET /enq_pages/new
  # GET /enq_pages/new.xml
  def new
    @enq_page = EnqPage.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @enq_page }
    end
  end

  # GET /enq_pages/1/edit
  def edit
    @enq_page = EnqPage.find(params[:id])
  end

  # POST /enq_pages
  # POST /enq_pages.xml
  def create
    @enq_page = EnqPage.new(params[:enq_page])

    respond_to do |format|
      if @enq_page.save
        format.html { redirect_to(@enq_page, :notice => 'EnqPage was successfully created.') }
        format.xml  { render :xml => @enq_page, :status => :created, :location => @enq_page }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @enq_page.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /enq_pages/1
  # PUT /enq_pages/1.xml
  def update
    @enq_page = EnqPage.find(params[:id])

    respond_to do |format|
      if @enq_page.update_attributes(params[:enq_page])
        format.html { redirect_to(@enq_page, :notice => 'EnqPage was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @enq_page.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /enq_pages/1
  # DELETE /enq_pages/1.xml
  def destroy
    @enq_page = EnqPage.find(params[:id])
    @enq_page.destroy

    respond_to do |format|
      format.html { redirect_to(enq_pages_url) }
      format.xml  { head :ok }
    end
  end
end
