class AddToGoogleMapPlaceIdToPlaces < ActiveRecord::Migration[5.2]
  def change
    add_column :places, :googlemap_place_id, :string
  end
end
