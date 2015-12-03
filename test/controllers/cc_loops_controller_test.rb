require 'test_helper'

class CcLoopsControllerTest < ActionController::TestCase
  setup do
    @cc_loop = cc_loops(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:cc_loops)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create cc_loop" do
    assert_difference('CcLoop.count') do
      post :create, cc_loop: { end_val: @cc_loop.end_val, loop_var: @cc_loop.loop_var, loop_while: @cc_loop.loop_while, start_val: @cc_loop.start_val }
    end

    assert_redirected_to cc_loop_path(assigns(:cc_loop))
  end

  test "should show cc_loop" do
    get :show, id: @cc_loop
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @cc_loop
    assert_response :success
  end

  test "should update cc_loop" do
    patch :update, id: @cc_loop, cc_loop: { end_val: @cc_loop.end_val, loop_var: @cc_loop.loop_var, loop_while: @cc_loop.loop_while, start_val: @cc_loop.start_val }
    assert_redirected_to cc_loop_path(assigns(:cc_loop))
  end

  test "should destroy cc_loop" do
    assert_difference('CcLoop.count', -1) do
      delete :destroy, id: @cc_loop
    end

    assert_redirected_to cc_loops_path
  end
end
