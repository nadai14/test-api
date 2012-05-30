class CreateBranches < ActiveRecord::Migration
  def self.up
    create_table :branches, :id => false do |t|
	  t.string :uuid,		:limit => 36,	:primary => true
      t.integer :enq_id,	:null => false
      t.integer :num,		:null => false
      t.string :answer,		:null => false
      t.integer :page_id,	:null => false
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	  add_index :branches, :enq_id
	  add_index :branches, :num
	  add_index :branches, :answer
	  add_index :branches, :page_id
  end

  def self.down
    drop_table :branches
  end
end
