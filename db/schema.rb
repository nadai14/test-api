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

ActiveRecord::Schema.define(:version => 20120603151938) do

  create_table "enq_faces", :id => false, :force => true do |t|
    t.string   "uuid",          :limit => 36
    t.string   "enq_id",                      :null => false
    t.string   "face",                        :null => false
    t.integer  "point",                       :null => false
    t.string   "first_page_id"
    t.integer  "wait_until"
    t.string   "css"
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

  create_table "enqs", :id => false, :force => true do |t|
    t.string   "uuid",        :limit => 36
    t.integer  "status",                    :default => 0, :null => false
    t.datetime "closed_at"
    t.string   "title"
    t.text     "description"
    t.text     "message"
    t.string   "movie"
    t.string   "thumbnail"
    t.string   "updated_by"
    t.datetime "updated_at"
  end

end
