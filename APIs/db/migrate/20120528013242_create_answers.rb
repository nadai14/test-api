class CreateAnswers < ActiveRecord::Migration
  def self.up
    create_table :answers do |t|
      t.integer :enq_id,	:null => false
      t.string :no,			:null => false
      t.string :answer,		:null => false
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	  add_index	:answers,	:enq_id
	  add_index	:answers,	:no
  end

  def self.down
    drop_table :answers
  end
end
