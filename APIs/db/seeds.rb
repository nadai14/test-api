# coding: utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#   
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Major.create(:name => 'Daley', :city => cities.first)
Enq.create({:enq_id => 1, :title => 'test1', :description => 'test1です', :css => 'css1', :movie => 'movie1', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
		   {:enq_id => 2, :css => 'css2', :movie => 'movie2', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
		   {:enq_id => 3, :title => 'test3', :description => 'test3です', :movie => 'movie3', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
		   {:enq_id => 2, :title => 'test4', :description => 'test4です', :css => 'css4', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
		   {:enq_id => 1, :title => 'test5', :description => 'test5です', :css => 'css5', :movie => 'movie5'})
		   
