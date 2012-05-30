require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Enq, "各値が設定されていない場合："  do
  before(:each) do
    @enq = Enq.new
  end
  
  it "バリデーションに失敗すること" do
    @enq.should_not be_valid
  end
end