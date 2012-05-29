class CreateEnqQuestions < ActiveRecord::Migration
  def self.up
    create_table :enq_questions do |t|
      t.integer :enq_id,		:null => false
      t.integer :no,			:null => false
      t.integer :question_id,	:null => false
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	  add_index	:enq_questions,	:enq_id,	:unique => true
	  add_index	:enq_questions,	:no,		:unique => true
	  add_index	:enq_questions,	:question_id
  end

  def self.down
    drop_table :enq_questions
  end
end
