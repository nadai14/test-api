class CreateEnqs < ActiveRecord::Migration
  def change
    create_table :enqs, :id => false do |t|
	  t.string :uuid, :limit => 36, :primary => true
      t.integer :status,		null: false,	:default => 0
	  t.date :opening_at
	  t.date :closing_at
      t.string :title
      t.string :description
	  t.string :message
      t.string :movie
      t.string :thumbnail
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
  end
end
