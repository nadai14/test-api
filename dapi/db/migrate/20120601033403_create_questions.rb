class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :question_id
      t.string :kind
      t.string :title
      t.string :content
      t.boolean :required
      t.string :answer_content
      t.string :answer_description
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
  end
end
