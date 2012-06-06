class CreateEnqFaces < ActiveRecord::Migration
  def change
    create_table :enq_faces, :id => false do |t|
	  t.string :uuid, :limit => 36, :primary => true
      t.string :enq_id,		null: false
      t.string :face,			null: false
	  t.integer :point,			null: false
      t.integer :first_page_id
      t.time :wait_until
      t.string :css
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	  add_index	:enq_faces,	[ :enq_id, :face ],	unique: true
  end
end
