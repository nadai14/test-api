require 'test_helper'

class EnqFacesControllerTest < ActionController::TestCase
  setup do
    @enq_face = enq_faces(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:enq_faces)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create enq_face" do
    assert_difference('EnqFace.count') do
      post :create, enq_face: { css: @enq_face.css, enq_id: @enq_face.enq_id, face: @enq_face.face, first_page_id: @enq_face.first_page_id, update_date: @enq_face.update_date, update_name: @enq_face.update_name, wait_until: @enq_face.wait_until }
    end

    assert_redirected_to enq_face_path(assigns(:enq_face))
  end

  test "should show enq_face" do
    get :show, id: @enq_face
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @enq_face
    assert_response :success
  end

  test "should update enq_face" do
    put :update, id: @enq_face, enq_face: { css: @enq_face.css, enq_id: @enq_face.enq_id, face: @enq_face.face, first_page_id: @enq_face.first_page_id, update_date: @enq_face.update_date, update_name: @enq_face.update_name, wait_until: @enq_face.wait_until }
    assert_redirected_to enq_face_path(assigns(:enq_face))
  end

  test "should destroy enq_face" do
    assert_difference('EnqFace.count', -1) do
      delete :destroy, id: @enq_face
    end

    assert_redirected_to enq_faces_path
  end
end
