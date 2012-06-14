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

ActiveRecord::Schema.define(:version => 20120609152534) do

  create_table "answers", :id => false, :force => true do |t|
    t.string   "uuid",            :limit => 36
    t.string   "enq_question_id",               :null => false
    t.string   "session_id",                    :null => false
    t.string   "user_agent",                    :null => false
    t.text     "answer",                        :null => false
    t.string   "updated_by"
    t.datetime "updated_at"
  end

  create_table "branches", :id => false, :force => true do |t|
    t.string   "uuid",            :limit => 36
    t.string   "enq_question_id",               :null => false
    t.string   "answer",                        :null => false
    t.string   "next_page_id",                  :null => false
    t.integer  "wait_until"
    t.string   "updated_by"
    t.datetime "updated_at"
  end

  create_table "campaigns", :id => false, :force => true do |t|
    t.string   "mid",            :limit => 36
    t.string   "enq_id"
    t.integer  "status",                       :default => 0, :null => false
    t.string   "platform",                                    :null => false
    t.integer  "point",                                       :null => false
    t.datetime "opening_at"
    t.datetime "closing_at"
    t.string   "movie"
    t.string   "thumbnail"
    t.text     "message"
    t.text     "conversion_tag"
    t.string   "second_picture"
    t.string   "banner_title"
    t.integer  "second_point"
    t.string   "client_url"
    t.string   "created_by"
    t.string   "updated_by"
  end

  create_table "choices", :id => false, :force => true do |t|
    t.string   "uuid",        :limit => 36
    t.string   "question_id",               :null => false
    t.integer  "order",                     :null => false
    t.string   "content",                   :null => false
    t.string   "updated_by"
    t.datetime "updated_at"
  end

  create_table "enq_faces", :id => false, :force => true do |t|
    t.string   "uuid",          :limit => 36
    t.string   "enq_id",                      :null => false
    t.string   "face",                        :null => false
    t.string   "first_page_id"
    t.integer  "wait_until"
    t.string   "css"
    t.string   "title"
    t.text     "description"
    t.string   "updated_by"
    t.datetime "updated_at"
  end

  create_table "enq_pages", :id => false, :force => true do |t|
    t.string   "uuid",         :limit => 36
    t.string   "enq_face_id",                :null => false
    t.text     "description"
    t.string   "next_page_id"
    t.integer  "wait_until"
    t.string   "updated_by"
    t.datetime "updated_at"
  end

  create_table "enq_questions", :id => false, :force => true do |t|
    t.string   "uuid",        :limit => 36
    t.string   "enq_page_id",               :null => false
    t.integer  "num",                       :null => false
    t.string   "seq",                       :null => false
    t.string   "question_id",               :null => false
    t.string   "updated_by"
    t.datetime "updated_at"
  end

  create_table "enqs", :id => false, :force => true do |t|
    t.string   "uuid",       :limit => 36
    t.integer  "status",                   :default => 0, :null => false
    t.string   "updated_by"
    t.datetime "updated_at"
  end

  create_table "questions", :id => false, :force => true do |t|
    t.string   "uuid",               :limit => 36
    t.string   "kind",                                                :null => false
    t.string   "title"
    t.text     "content"
    t.boolean  "required",                         :default => false, :null => false
    t.text     "answer_content"
    t.text     "answer_description"
    t.string   "updated_by"
    t.datetime "updated_at"
  end

end
