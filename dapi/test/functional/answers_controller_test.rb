require 'test_helper'

class AnswersControllerTest < ActionController::TestCase
  test "should get sendAnswer" do
    get :sendAnswer
    assert_response :success
  end

end
