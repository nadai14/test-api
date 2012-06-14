module ApplicationHelper

  def extract_nil(object, *attributes)
    attributes.select {|attr| not object.send(attr).nil?}
  end

end
