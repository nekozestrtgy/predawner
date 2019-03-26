class CreatePlaces < ActiveRecord::Migration[5.2]
  def change
    create_table :places do |t|
      t.string :name, null: false
      t.time :opening_time, null: false
      t.time :closing_time, null: false
      t.string :adress
      t.string :smoking_available
      t.string :wifi_available
      t.string :outlet_available
      t.string :menu_price
      t.string :homepage_url

      t.timestamps
    end
  end
end
