require 'test_helper'

class EnqPagesControllerTest < ActionController::TestCase
  test "should get getEnqPage" do
    get :getEnqPage
    assert_response :success
  end

end
