class CreateBranches < ActiveRecord::Migration
  def change
    create_table :branches do |t|
      t.integer :enq_id
      t.integer :num
      t.string :answer
      t.integer :next_page_id
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
  end
end
