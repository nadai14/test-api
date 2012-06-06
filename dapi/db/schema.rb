# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120604073954) do

  create_table "answers", :id => false, :force => true do |t|
    t.string   "uuid",        :limit => 36
    t.integer  "enq_id",                    :null => false
    t.string   "num",                       :null => false
    t.string   "answer",                    :null => false
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  add_index "answers", ["enq_id", "num"], :name => "index_answers_on_enq_id_and_num", :unique => true

  create_table "branches", :id => false, :force => true do |t|
    t.string   "uuid",         :limit => 36
    t.integer  "enq_id",                     :null => false
    t.integer  "num",                        :null => false
    t.string   "answer",                     :null => false
    t.integer  "next_page_id",               :null => false
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
  end

  add_index "branches", ["enq_id", "num", "answer"], :name => "index_branches_on_enq_id_and_num_and_answer", :unique => true
  add_index "branches", ["next_page_id"], :name => "index_branches_on_next_page_id"

  create_table "choices", :id => false, :force => true do |t|
    t.string   "uuid",        :limit => 36
    t.integer  "question_id",               :null => false
    t.integer  "choice_id",                 :null => false
    t.string   "content",                   :null => false
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  add_index "choices", ["question_id", "choice_id"], :name => "index_choices_on_question_id_and_choice_id", :unique => true

  create_table "enq_faces", :id => false, :force => true do |t|
    t.string   "uuid",          :limit => 36
    t.string   "enq_id",                      :null => false
    t.string   "face",                        :null => false
    t.integer  "point",                       :null => false
    t.integer  "first_page_id"
    t.time     "wait_until"
    t.string   "css"
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
  end

  add_index "enq_faces", ["enq_id", "face"], :name => "index_enq_faces_on_enq_id_and_face", :unique => true

  create_table "enq_pages", :id => false, :force => true do |t|
    t.string   "uuid",         :limit => 36
    t.integer  "enq_id",                                       :null => false
    t.integer  "page_id",                                      :null => false
    t.string   "face",                       :default => "PC", :null => false
    t.string   "description"
    t.time     "wait_until"
    t.integer  "next_page_id"
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",                                   :null => false
    t.datetime "updated_at",                                   :null => false
  end

  add_index "enq_pages", ["enq_id", "page_id", "face"], :name => "index_enq_pages_on_enq_id_and_page_id_and_face", :unique => true

  create_table "enq_questions", :id => false, :force => true do |t|
    t.string   "uuid",        :limit => 36
    t.integer  "enq_id",                    :null => false
    t.integer  "num",                       :null => false
    t.integer  "question_id",               :null => false
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  add_index "enq_questions", ["enq_id", "num"], :name => "index_enq_questions_on_enq_id_and_num", :unique => true
  add_index "enq_questions", ["question_id"], :name => "index_enq_questions_on_question_id"

  create_table "enqs", :id => false, :force => true do |t|
    t.string   "uuid",        :limit => 36
    t.integer  "status",                    :default => 0, :null => false
    t.date     "opening_at"
    t.date     "closing_at"
    t.string   "title"
    t.string   "description"
    t.string   "message"
    t.string   "movie"
    t.string   "thumbnail"
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",                               :null => false
    t.datetime "updated_at",                               :null => false
  end

  create_table "questions", :id => false, :force => true do |t|
    t.string   "uuid",               :limit => 36
    t.integer  "question_id",                      :null => false
    t.string   "kind",                             :null => false
    t.string   "title"
    t.string   "content"
    t.boolean  "required"
    t.string   "answer_content"
    t.string   "answer_description"
    t.string   "update_name"
    t.date     "update_date"
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
  end

  add_index "questions", ["question_id"], :name => "index_questions_on_question_id", :unique => true

end
