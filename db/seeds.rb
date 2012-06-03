# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

enq = Enq.create(status: 0, title: 'title', description: 'desc', message: 'msg', movie: 'movie', thumbnail: 'thumbnail')

EnqFace.create(enq_id: enq.uuid, face: 1, first_page_id: 'page1', wait_until: '10:00:00', css: 'css')
