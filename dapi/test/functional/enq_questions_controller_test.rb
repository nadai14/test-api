require 'test_helper'

class EnqQuestionsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:enq_questions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create enq_question" do
    assert_difference('EnqQuestion.count') do
      post :create, :enq_question => { }
    end

    assert_redirected_to enq_question_path(assigns(:enq_question))
  end

  test "should show enq_question" do
    get :show, :id => enq_questions(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => enq_questions(:one).to_param
    assert_response :success
  end

  test "should update enq_question" do
    put :update, :id => enq_questions(:one).to_param, :enq_question => { }
    assert_redirected_to enq_question_path(assigns(:enq_question))
  end

  test "should destroy enq_question" do
    assert_difference('EnqQuestion.count', -1) do
      delete :destroy, :id => enq_questions(:one).to_param
    end

    assert_redirected_to enq_questions_path
  end
end
