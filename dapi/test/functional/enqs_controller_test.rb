require 'test_helper'

class EnqsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:enqs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create enq" do
    assert_difference('Enq.count') do
      post :create, :enq => { }
    end

    assert_redirected_to enq_path(assigns(:enq))
  end

  test "should show enq" do
    get :show, :id => enqs(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => enqs(:one).to_param
    assert_response :success
  end

  test "should update enq" do
    put :update, :id => enqs(:one).to_param, :enq => { }
    assert_redirected_to enq_path(assigns(:enq))
  end

  test "should destroy enq" do
    assert_difference('Enq.count', -1) do
      delete :destroy, :id => enqs(:one).to_param
    end

    assert_redirected_to enqs_path
  end
end
