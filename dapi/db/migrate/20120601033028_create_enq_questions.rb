class CreateEnqQuestions < ActiveRecord::Migration
  def change
    create_table :enq_questions do |t|
      t.integer :enq_id
      t.integer :num
      t.integer :question_id
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
  end
end
