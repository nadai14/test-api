class CreateEnqQuestions < ActiveRecord::Migration
  def self.up
    create_table :enq_questions, :id => false do |t|
	  t.string :uuid,		:limit => 36,	:primary => true
      t.integer :enq_id,		:null => false
      t.integer :num,			:null => false
      t.integer :question_id,	:null => false
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	  
	  add_index :enq_questions, :enq_id
	  add_index :enq_questions, :num
	  add_index :enq_questions, :question_id
  end

  def self.down
    drop_table :enq_questions
  end
end
