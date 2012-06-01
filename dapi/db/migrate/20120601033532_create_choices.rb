class CreateChoices < ActiveRecord::Migration
  def change
    create_table :choices do |t|
      t.integer :question_id
      t.integer :choice_id
      t.string :content
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
  end
end
