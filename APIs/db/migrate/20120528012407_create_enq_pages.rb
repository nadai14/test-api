class CreateEnqPages < ActiveRecord::Migration
  def self.up
    create_table :enq_pages do |t|
      t.integer :enq_id,	:null => false
      t.integer :page_id,	:null => false
      t.string :face,		:null => false
      t.integer :interval
      t.string :description
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	add_index	:enq_pages,	:enq_id
	add_index	:enq_pages,	:page_id
	add_index	:enq_pages,	:face
  end

  def self.down
    drop_table :enq_pages
  end
end
