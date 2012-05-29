# coding: utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#   
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Major.create(:name => 'Daley', :city => cities.first)
Enq.create([{:enq_id => 1, :title => 'test1', :description => 'test1です', :css => 'css1', :movie => 'movie1', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
		   {:enq_id => 2, :css => 'css2', :movie => 'movie2', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
		   {:enq_id => 3, :title => 'test3', :description => 'test3です', :movie => 'movie3', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
		   {:enq_id => 4, :title => 'test4', :description => 'test4です', :css => 'css4', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},])
		   
EnqPage.create=([{:enq_id => 1, :page_id => 1, :face => 'iOS', :description => 'iOSです1', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:enq_id => 1, :page_id => 2, :face => 'iOS', :description => 'iOSです2', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:enq_id => 2, :page_id => 1, :face => 'PC', :description => 'PCです1', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:enq_id => 2, :page_id => 2, :face => 'PC', :description => 'PCです2', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:enq_id => 3, :page_id => 1, :face => 'Android', :description => 'Androidです1', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:enq_id => 3, :page_id => 2, :face => 'Android', :description => 'Androidです2', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:enq_id => 3, :page_id => 3, :face => 'Android', :description => 'Androidです3'},
				{:enq_id => 4, :page_id => 1, :face => 'iOS', :update_name => '石川', :update_date => '2012-05-29 12:00:00'}])
				
EnqQuestion.create([{:enq_id => 1, :no => 1, :question_id => 1, :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
					{:enq_id => , :no => , :question_id => , :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
					{:enq_id => , :no => , :question_id => , :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
					{:enq_id => , :no => , :question_id => , :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
					{:enq_id => , :no => , :question_id => , :update_name => '石川', :update_date => '2012-05-29 12:00:00'}])

Question.create([{:question_id => 1, :kind => '設問種類1', :title => '設問タイトル1', :content => '設問内容1', :answer_content => '正解内容1', :answer_description => '正解説明1' :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:question_id => 2, :kind => '設問種類2', :title => '設問タイトル2', :content => '設問内容2', :answer_content => '正解内容2', :answer_description => '正解説明2' :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:question_id => 3, :kind => '設問種類3', :title => '設問タイトル3', :content => '設問内容3', :answer_content => '正解内容3', :answer_description => '正解説明3' :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:question_id => 4, :kind => '設問種類4', :title => '設問タイトル4', :content => '設問内容4', :answer_content => '正解内容4', :answer_description => '正解説明4' :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:question_id => 5, :kind => '設問種類5', :title => '設問タイトル5', :content => '設問内容5', :answer_content => '正解内容5', :answer_description => '正解説明5' :update_name => '石川', :update_date => '2012-05-29 12:00:00'}])

Choice.create([{:question_id => 1, :choice_id => 1, :content => '選択肢内容1', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:question_id => 2, :choice_id => 2, :content => '選択肢内容2', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:question_id => 3, :choice_id => 3, :content => '選択肢内容3', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:question_id => 4, :choice_id => 4, :content => '選択肢内容4', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:question_id => 5, :choice_id => 5, :content => '選択肢内容5', :update_name => '石川', :update_date => '2012-05-29 12:00:00'}])

Answer.create([{:enq_id => 1, :no => 1, :answer => '回答1', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:enq_id => 2, :no => 2, :answer => '回答2', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:enq_id => 3, :no => 3, :answer => '回答3', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:enq_id => 4, :no => 4, :answer => '回答4', :update_name => '石川', :update_date => '2012-05-29 12:00:00'},
				{:enq_id => 5, :no => 5, :answer => '回答5', :update_name => '石川', :update_date => '2012-05-29 12:00:00'}])


					