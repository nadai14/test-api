class CreateAnswers < ActiveRecord::Migration
  def self.up
    create_table :answers, :id => false do |t|
	  t.string :uuid,		:limit => 36,	:primary => true
      t.integer :enq_id,	:null => false
      t.integer :num,		:null => false
      t.string :answer
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	  add_index :answers, :enq_id, :unique => true
	  add_index :answers, :num, :unique => true
  end

  def self.down
    drop_table :answers
  end
end
