class CreateQuestions < ActiveRecord::Migration
  def self.up
    create_table :questions do |t|
      t.integer :question_id,	:null => false
      t.string :kind,			:null => false
      t.string :title
      t.string :content
      t.string :answer_content
      t.string :answer_description
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	  add_index	:questions,	:question_id,	:unique => true
  end

  def self.down
    drop_table :questions
  end
end
