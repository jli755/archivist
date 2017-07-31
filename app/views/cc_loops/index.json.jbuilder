json.array!(@collection) do |cc_loop|
  json.extract! cc_loop, :id, :loop_var, :start_val, :end_val, :loop_while, :position
  json.label cc_loop.label
  json.children cc_loop.children do |child|
    json.id child.id
    json.type child.class.name
  end
  json.parent_id cc_loop.parent_id
  json.parent_type cc_loop.parent_type
  json.topic cc_loop.topic || cc_loop.find_closest_ancestor_topic
end
