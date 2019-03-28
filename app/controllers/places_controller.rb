class PlacesController < ApplicationController

  def index
    @place = Place.find(1)
    gon.place_name = @place.name
    gon.place_lat = @place.latitude
    gon.place_lng = @place.longitude
  end
end
