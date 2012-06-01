class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :enq_id
      t.string :num
      t.string :answer
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
  end
end
