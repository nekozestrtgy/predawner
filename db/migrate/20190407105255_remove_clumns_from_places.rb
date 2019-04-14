class RemoveClumnsFromPlaces < ActiveRecord::Migration[5.2]
  def change
    remove_column :places, :opening_time, :time
    remove_column :places, :closing_time, :time
    remove_column :places, :smoking_available, :string
    remove_column :places, :wifi_available, :string
    remove_column :places, :outlet_available, :string
    remove_column :places, :menu_price, :string
    remove_column :places, :homepage_url, :string
  end
end
