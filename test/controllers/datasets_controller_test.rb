require 'test_helper'

class DatasetsControllerTest < ActionController::TestCase
  setup do
    @user = users :User_1
    sign_in @user
    @dataset = datasets(:Dataset_1)
  end

  test "should get index" do
    get :index, format: :json
    assert_response :success
    assert_not_nil assigns(:collection)
  end

  test "should create dataset" do
    assert_difference('Dataset.count') do
      post :create, format: :json, params: { dataset: {name: @dataset.name} }
    end

    assert_response :success
  end

  test "should show dataset" do
    get :show, format: :json, params: { id: @dataset }
    assert_response :success
  end

  test "should update dataset" do
    patch :update, format: :json, params: { id: @dataset, dataset: {name: @dataset.name} }
    assert_response :success
  end

  test "should destroy dataset" do
    assert_difference('Dataset.count', -1) do
      delete :destroy, format: :json, params: { id: @dataset.id }
    end

    assert_response :success
  end

  test "should show dv.txt" do
    dataset = FactoryBot.create(:dataset)
    source_variable = FactoryBot.create(:variable, dataset: dataset)
    derived_variable = FactoryBot.create(:variable, dataset: dataset)
    derived_variable.src_variables << source_variable
    get :dv, format: :txt, params: { id: dataset.id }
    map = DvMapping.last
    assert_response :success
    parsed_response = response.body.split("\n").map{|line| line.split("\t")}
    assert_equal parsed_response.first, [map.dataset_instance_name, derived_variable.name, map.dataset_instance_name,  source_variable.name]
  end
end
