json.(@campaign, :uuid, :point, :platform)
json.movie @campaign.movie unless @campaign.movie.nil?
json.thumbnail @campaign.thumbnail unless @campaign.thumbnail.nil?
json.conversion_tag @campaign.conversion_tag unless @campaign.conversion_tag.nil?
json.second_picture @campaign.second_picture unless @campaign.second_picture.nil?
json.second_point @campaign.second_point unless @campaign.second_point.nil?
json.client_url @campaign.client_url unless @campaign.client_url.nil?
json.message (@campaign.message.nil? ? defaultMessage : @campaign.message)

# face
@campaign.enq.enq_faces.first.tap do |face|
  json.first_page_id face.first_page_id unless face.first_page_id.nil?
  json.wait_until face.wait_until unless face.wait_until.nil?
  json.title (face.title.nil? ? defaultTitle(face) : face.title)
  json.description (face.description.nil? ? defaultDescription(face) : face.description)
  json.css (face.css.nil? ? defaultCss(face) : face.css)
end
