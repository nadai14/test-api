class CreateQuestions < ActiveRecord::Migration
  def change
    #create_table :questions, :id => false do |t|
	#  t.string :uuid, :limit => 36, :primary => true
    create_table :questions, :id => false do |t|
	  t.string :uuid,	:limit => 36,	:primary => true
      t.integer :question_id,		null: false
      t.string :kind,				null: false
      t.string :title
      t.string :content
      t.boolean :required
      t.string :answer_content
      t.string :answer_description
      t.string :update_name
      t.date :update_date

      t.timestamps
    end
	
	add_index	:questions,	:question_id,	unique: true
  end
end
