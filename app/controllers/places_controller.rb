class PlacesController < ApplicationController

  def index
    @places = Place.all
    gon.place = @places
    # gon.place_lat = @places.latitude
    # gon.place_lng = @places.longitude
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
