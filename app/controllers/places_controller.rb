class PlacesController < ApplicationController

  def index
    @current_user = User.find(current_user.id) if current_user
    @places = Place.all
    gon.place = @places
    @search_places = Place.where('name LIKE(?) OR address LIKE(?)', "%#{params[:keyword]}%", "%#{params[:keyword]}%").limit(10)
    respond_to do |format|
      format.html
      format.json { render json: @search_places }
    end
  end

  def new
    @place = Place.new
    @places = Place.all
    gon.place = @places
  end

  def create
    @place = Place.new(place_params)
    @place.save
    redirect_to root_path, notice: 'お店を登録しました'
  end

  def show
  end

  private
  def place_params
    params.require(:place).permit(:name, :address, :latitude, :longitude, :googlemap_place_id)
  end

end
