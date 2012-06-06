class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers, :id => false do |t|
	  t.string :uuid, :limit => 36, :primary => true
      t.integer :enq_id,	null: false
      t.string :num,		null: false
      t.string :answer,		null: false
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	add_index	:answers,	[ :enq_id, :num ],	unique: true
  end
end
