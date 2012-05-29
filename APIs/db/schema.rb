# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120528020920) do

  create_table "answers", :force => true do |t|
    t.integer  "enq_id",      :null => false
    t.string   "no",          :null => false
    t.string   "answer",      :null => false
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "answers", ["enq_id"], :name => "index_answers_on_enq_id", :unique => true
  add_index "answers", ["no"], :name => "index_answers_on_no", :unique => true

  create_table "choices", :force => true do |t|
    t.integer  "question_id", :null => false
    t.integer  "choice_id",   :null => false
    t.string   "content",     :null => false
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "choices", ["choice_id"], :name => "index_choices_on_choice_id", :unique => true
  add_index "choices", ["question_id"], :name => "index_choices_on_question_id", :unique => true

  create_table "enq_pages", :force => true do |t|
    t.integer  "enq_id",      :null => false
    t.integer  "page_id",     :null => false
    t.string   "face",        :null => false
    t.string   "description"
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "enq_pages", ["enq_id"], :name => "index_enq_pages_on_enq_id", :unique => true
  add_index "enq_pages", ["face"], :name => "index_enq_pages_on_face", :unique => true
  add_index "enq_pages", ["page_id"], :name => "index_enq_pages_on_page_id", :unique => true

  create_table "enq_questions", :force => true do |t|
    t.integer  "enq_id",      :null => false
    t.integer  "no",          :null => false
    t.integer  "question_id", :null => false
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "enq_questions", ["enq_id"], :name => "index_enq_questions_on_enq_id", :unique => true
  add_index "enq_questions", ["no"], :name => "index_enq_questions_on_no", :unique => true
  add_index "enq_questions", ["question_id"], :name => "index_enq_questions_on_question_id"

  create_table "enqs", :force => true do |t|
    t.integer  "enq_id",      :null => false
    t.string   "title"
    t.string   "description"
    t.string   "css"
    t.string   "movie"
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "enqs", ["enq_id"], :name => "index_enqs_on_enq_id", :unique => true

  create_table "questions", :force => true do |t|
    t.integer  "question_id",        :null => false
    t.string   "kind",               :null => false
    t.string   "title"
    t.string   "content"
    t.string   "answer_content"
    t.string   "answer_description"
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "questions", ["question_id"], :name => "index_questions_on_question_id", :unique => true

end
