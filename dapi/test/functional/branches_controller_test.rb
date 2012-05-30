require 'test_helper'

class BranchesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:branches)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create branche" do
    assert_difference('Branche.count') do
      post :create, :branche => { }
    end

    assert_redirected_to branche_path(assigns(:branche))
  end

  test "should show branche" do
    get :show, :id => branches(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => branches(:one).to_param
    assert_response :success
  end

  test "should update branche" do
    put :update, :id => branches(:one).to_param, :branche => { }
    assert_redirected_to branche_path(assigns(:branche))
  end

  test "should destroy branche" do
    assert_difference('Branche.count', -1) do
      delete :destroy, :id => branches(:one).to_param
    end

    assert_redirected_to branches_path
  end
end
