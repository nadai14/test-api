# coding: utf-8

require 'pathname'
require 'yaml'

MOVIE_TYPES = [
  {:mime_type => "application/x-mpegURL", :src => ".m3u8"}, 
  {:mime_type => "video/x-flv",           :src => ".flv"},
  {:mime_type => "video/mp4",             :src => ".mp4"}
]

results = Campaign.all(:conditions => 'movie IS NOT NULL').map do |campaign|
  MOVIE_TYPES.map do |type|
    {
      :campaign_id => campaign.mid, 
      :src => Pathname(campaign.movie).sub_ext(type[:src]).to_s,
      :mime_type => type[:mime_type],
      :duration => 0
    }
  end
end

result = results.flatten.each_with_index.each_with_object({}){|(movie, i), acuum| acuum[i] = movie}

File.open(ARGV[0], 'w') do |out|
  YAML.dump(result, out)
end


