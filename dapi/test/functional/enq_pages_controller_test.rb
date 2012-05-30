require 'test_helper'

class EnqPagesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:enq_pages)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create enq_page" do
    assert_difference('EnqPage.count') do
      post :create, :enq_page => { }
    end

    assert_redirected_to enq_page_path(assigns(:enq_page))
  end

  test "should show enq_page" do
    get :show, :id => enq_pages(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => enq_pages(:one).to_param
    assert_response :success
  end

  test "should update enq_page" do
    put :update, :id => enq_pages(:one).to_param, :enq_page => { }
    assert_redirected_to enq_page_path(assigns(:enq_page))
  end

  test "should destroy enq_page" do
    assert_difference('EnqPage.count', -1) do
      delete :destroy, :id => enq_pages(:one).to_param
    end

    assert_redirected_to enq_pages_path
  end
end
