class CreateEnqPages < ActiveRecord::Migration
  def self.up
    create_table :enq_pages do |t|
      t.integer :enq_id,	:null => false
      t.integer :page_id,	:null => false
      t.string :face,		:null => false
      t.string :description
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	add_index	:enq_pages,	:enq_id,	:unique => true
	add_index	:enq_pages,	:page_id,	:unique => true
	add_index	:enq_pages,	:face,		:unique => true
  end

  def self.down
    drop_table :enq_pages
  end
end
