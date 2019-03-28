class PlacesController < ApplicationController

  def index
    @place = Place.find(1)
    gon.place_name = @place.name
    gon.place_lat = @place.latitude
    gon.place_lng = @place.longitude
  end

  def new
    @place = Place.new
  end

  def create
    @place = Place.new(place_params)
    @place.save
    redirect_to root_path, notice: 'プレイスを登録しました'
  end

  def show
  end

  private
  def place_params
    params.require(:place).permit(:name, :address, :opening_time, :closing_time, :smoking_available, :wifi_available, :outlet_available, :menu_price, :homepage_url, :latitude, :longitude)
  end

end
