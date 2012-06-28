class ChangeAtSprint3 < ActiveRecord::Migration
  def up
    # campaigns
    change_table :campaigns do |t|
      t.string :mcd
      t.text :button_text
      t.timestamp :deleted_at
      t.remove :movie, :status
      t.timestamps
    end
    Campaign.update_all("mcd = mid")
    change_column :campaigns, :mcd, :string, :null => false
    add_index :campaigns, :mcd

    # campaign_faces
    create_table :campaign_faces, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.string :campaign_id, :null => false
      t.string :face, :null => false
      t.string :css
      t.string :title
      t.text :description
      t.string :updated_by
      t.timestamp :updated_at
      t.timestamp :deleted_at
    end
    add_index :campaign_faces, [:campaign_id, :face, :deleted_at], :unique => true

    # movies
    create_table :movies, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.string :campaign_id, :null => false
      t.string :mime_type
      t.string :src, :null => false
      t.integer :duration, :null => false
      t.string :updated_by
      t.timestamp :updated_at
      t.timestamp :deleted_at
    end
    add_index :movies, [:campaign_id, :mime_type, :deleted_at], :unique => true

    # enqs
    change_table :enqs do |t|
      t.text :message
      t.text :button_text
      t.timestamp :deleted_at
    end
    remove_column :enqs, :status

    # enq_faces
    add_column :enq_faces, :deleted_at, :timestamp
    remove_column :enq_faces, [:css, :title, :description]
    remove_index :enq_faces, [:enq_id, :face]
    add_index :enq_faces, [:enq_id, :face, :deleted_at], :unique => true

    # enq_pages
    add_column :enq_pages, :deleted_at, :timestamp

    # enq_questions
    add_column :enq_questions, :deleted_at, :timestamp
    remove_index :enq_questions, [:enq_page_id, :num]
    add_index :enq_questions, [:enq_page_id, :num, :deleted_at], :unique => true

    # branches
    add_column :branches, :deleted_at, :timestamp
    remove_index :branches, [:enq_question_id, :answer]
    add_index :branches, [:enq_question_id, :answer, :deleted_at], :unique => true

    # questions
    add_column :questions, :deleted_at, :timestamp

    # choices
    add_column :choices, :deleted_at, :timestamp

    # answers
    add_column :answers, :deleted_at, :timestamp
    remove_index :answers, [:campaign_id, :enq_question_id, :user_id]
    add_index :answers, [:campaign_id, :enq_question_id, :user_id, :deleted_at], :unique => true, :name => 'idx_answers_on_answers_unique'
  end

  def down
    # campaigns
    remove_index :campaigns, :mcd
    change_table :campaigns do |t|
      t.string :movie
      t.integer :status, :null => false, :default => 0
      t.remove :mcd, :button_text, :deleted_at, :created_at, :updated_at
    end

    # campaign_faces
    remove_index :campaign_faces, [:campaign_id, :face, :deleted_at]
    drop_table :campaign_faces

    # movies
    remove_index :movies, [:campaign_id, :mime_type, :deleted_at]
    drop_table :movies

    # enqs
    add_column :enqs, :status, :integer, {:null => false, :default => 0}
    remove_column :enqs, [:message, :button_text, :deleted_at]

    # enq_faces
    remove_index :enq_faces, [:enq_id, :face, :deleted_at]
    remove_column :enq_faces, :deleted_at
    add_index :enq_faces, [:enq_id, :face], :unique => true
    change_table :enq_faces do |t|
      t.string :css
      t.string :title
      t.text :description
    end

    # enq_pages
    remove_column :enq_pages, :deleted_at

    # enq_questions
    remove_index :enq_questions, [:enq_page_id, :num, :deleted_at]
    remove_column :enq_questions, :deleted_at
    add_index :enq_questions, [:enq_page_id, :num], :unique => true

    # branches
    remove_index :branches, [:enq_question_id, :answer, :deleted_at]
    remove_column :branches, :deleted_at, :timestamp
    add_index :branches, [:enq_question_id, :answer], :unique => true

    # questions
    remove_column :questions, :deleted_at

    # choices
    remove_column :choices, :deleted_at

    # answers
    remove_index :answers, :name => 'idx_answers_on_answers_unique'
    remove_column :answers, :deleted_at
    add_index :answers, [:campaign_id, :enq_question_id, :user_id], :unique => true
  end

end
