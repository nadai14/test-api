class CreateEnqs < ActiveRecord::Migration
  def change
    create_table :enqs, :id => false do |t|
      t.string :uuid, :limit => 36, :primary => true
      t.integer :status
      t.string :title
      t.text :description
      t.text :message
      t.string :movie
      t.string :thumbnail

      t.timestamps
    end
  end
end
