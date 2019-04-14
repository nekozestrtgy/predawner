json.array! @search_places do |search_place|
  json.name  search_place.name
  json.googlemap_place_id  search_place.googlemap_place_id
end
