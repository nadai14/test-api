class CreateEnqPages < ActiveRecord::Migration
  def change
    create_table :enq_pages, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.string :enq_face_id, :null => false
      t.text :description
      t.string :next_page_id
      t.integer :wait_until

      t.string :updated_by
      t.timestamp :updated_at
    end
  end
end
