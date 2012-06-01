class CreateEnqPages < ActiveRecord::Migration
  def change
    create_table :enq_pages do |t|
      t.integer :enq_id
      t.integer :page_id
      t.string :face
      t.string :description
      t.time :wait_until
      t.integer :next_page_id
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
  end
end
