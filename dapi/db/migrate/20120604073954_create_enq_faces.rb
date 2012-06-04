class CreateEnqFaces < ActiveRecord::Migration
  def change
    #create_table :enq_faces, :id => false do |t|
	#  t.string :uuid, :limit => 36, :primary => true
    create_table :enq_faces do |t|
      t.integer :enq_id,		null: false
      t.string :face,			null: false
      t.integer :first_page_id,	null: false,	default: 1
      t.time :wait_until
      t.string :css
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	  add_index	:enq_faces,	[ :enq_id, :face ],	unique: true
  end
end
