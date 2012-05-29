class CreateChoices < ActiveRecord::Migration
  def self.up
    create_table :choices do |t|
      t.integer :question_id,	:null => false
      t.integer :choice_id,		:null => false
      t.string :content,		:null => false
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	  add_index	:choices,	:question_id,	:unique => true
	  add_index	:choices,	:choice_id,		:unique => true
  end

  def self.down
    drop_table :choices
  end
end
