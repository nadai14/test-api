class BranchesController < ApplicationController
  # GET /branches
  # GET /branches.xml
  def index
    @branches = Branche.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @branches }
    end
  end

  # GET /branches/1
  # GET /branches/1.xml
  def show
    @branche = Branche.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @branche }
    end
  end

  # GET /branches/new
  # GET /branches/new.xml
  def new
    @branche = Branche.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @branche }
    end
  end

  # GET /branches/1/edit
  def edit
    @branche = Branche.find(params[:id])
  end

  # POST /branches
  # POST /branches.xml
  def create
    @branche = Branche.new(params[:branche])

    respond_to do |format|
      if @branche.save
        format.html { redirect_to(@branche, :notice => 'Branche was successfully created.') }
        format.xml  { render :xml => @branche, :status => :created, :location => @branche }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @branche.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /branches/1
  # PUT /branches/1.xml
  def update
    @branche = Branche.find(params[:id])

    respond_to do |format|
      if @branche.update_attributes(params[:branche])
        format.html { redirect_to(@branche, :notice => 'Branche was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @branche.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /branches/1
  # DELETE /branches/1.xml
  def destroy
    @branche = Branche.find(params[:id])
    @branche.destroy

    respond_to do |format|
      format.html { redirect_to(branches_url) }
      format.xml  { head :ok }
    end
  end
end
