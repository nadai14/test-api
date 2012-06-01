require 'test_helper'

class EnqsControllerTest < ActionController::TestCase
  test "should get getEnq" do
    get :getEnq
    assert_response :success
  end

end
