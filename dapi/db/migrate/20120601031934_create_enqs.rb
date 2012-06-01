class CreateEnqs < ActiveRecord::Migration
  def change
    create_table :enqs do |t|
      t.integer :enq_id
      t.integer :page_id
      t.integer :first_page_id
      t.integer :status
      t.string :title
      t.string :description
      t.string :css
      t.string :movie
      t.string :thumbnail
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
  end
end
