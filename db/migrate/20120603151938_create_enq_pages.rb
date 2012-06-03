class CreateEnqPages < ActiveRecord::Migration
  def change
    create_table :enq_pages, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.string :enq_face_id
      t.text :description
      t.string :next_page_id
      t.integer :wait_until

      t.timestamps
    end
  end
end
