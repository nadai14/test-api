class CreateEnqFaces < ActiveRecord::Migration
  def change
    create_table :enq_faces, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.string :enq_id
      t.string :face
      t.string :first_page_id
      t.time :wait_until
      t.string :css

      t.timestamps
    end
  end
end
