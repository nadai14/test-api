# coding: utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

enq1 = Enq.create(status: 1)
enq2 = Enq.create(status: 0)
enq3 = Enq.create(status: 9)

campaign1 = Campaign.create(mid: "1", status: 1, enq_id: enq1.uuid, platform: 'mixi', point: 10, message: 'キャンペーン1メッセージ', movie: 'movie1', thumbnail: 'thumbnail1')
campaign2 = Campaign.create(mid: "2", status: 1, enq_id: enq1.uuid, platform: 'gree', point: 20, message: 'キャンペーン2メッセージ', movie: 'movie2', thumbnail: 'thumbnail2')
campaign3 = Campaign.create(mid: "3", status: 1, enq_id: enq2.uuid, platform: 'gree', point: 30, message: 'キャンペーン3メッセージ', movie: 'movie3', thumbnail: 'thumbnail3')

enq1_face_to = EnqFace.create(enq_id: enq1.uuid, face: 'TO', wait_until: '10:00:00', css: 'css1', title: 'アンケート1TO', description: 'アンケート1説明TO')
enq1_face_pc = EnqFace.create(enq_id: enq1.uuid, face: 'PC', wait_until: '10:00:00', css: 'css2', title: 'アンケート1PC', description: 'アンケート1説明PC')

enq2_face_to = EnqFace.create(enq_id: enq2.uuid, face: 'TO', wait_until: '10:10:00', css: 'css3', title: 'アンケート2TO', description: 'アンケート2説明TO')
enq2_face_pc = EnqFace.create(enq_id: enq2.uuid, face: 'PC', wait_until: '10:20:00', css: 'css4', title: 'アンケート2PC', description: 'アンケート2説明PC')

enq3_face_to = EnqFace.create(enq_id: enq3.uuid, face: 'TO', wait_until: '30:00:00', css: 'css5', title: 'アンケート3TO', description: 'アンケート3説明TO')
enq3_face_pc = EnqFace.create(enq_id: enq3.uuid, face: 'PC', wait_until: '30:00:00', css: 'css6', title: 'アンケート3PC', description: 'アンケート3説明PC')

q1 = Question.create(kind: 'radio', title: '問題1', content: '問題1本文', required: false, answer_content: '問題1正解', answer_description: '問題1解説')
q2 = Question.create(kind: 'select', title: '問題2', content: '問題2本文', required: true, answer_content: '問題2正解', answer_description: '問題2解説')
q3 = Question.create(kind: 'check', title: '問題3', content: '問題3本文', required: true, answer_content: '問題3正解', answer_description: '問題3解説')
q4 = Question.create(kind: 'text', title: '問題4', content: '問題4本文', required: false, answer_content: '問題4正解', answer_description: '問題4解説')
q5 = Question.create(kind: 'textarea', title: '問題5', content: '問題5本文', required: false, answer_content: '問題5正解', answer_description: '問題5解説')

q1_c1 = Choice.create(question_id: q1.uuid, content: '問題1選択肢1', order: 1)
q1_c2 = Choice.create(question_id: q1.uuid, content: '問題1選択肢2', order: 2)
q1_c3 = Choice.create(question_id: q1.uuid, content: '問題1選択肢3', order: 3)

q2_c1 = Choice.create(question_id: q2.uuid, content: '問題2選択肢1', order: 1)
q2_c2 = Choice.create(question_id: q2.uuid, content: '問題2選択肢2', order: 2)
q2_c3 = Choice.create(question_id: q2.uuid, content: '問題2選択肢3', order: 3)

q3_c1 = Choice.create(question_id: q3.uuid, content: '問題3選択肢1', order: 1)
q3_c2 = Choice.create(question_id: q3.uuid, content: '問題3選択肢2', order: 2)
q3_c3 = Choice.create(question_id: q3.uuid, content: '問題3選択肢3', order: 3)

enq1_to_page3 = EnqPage.create(enq_face_id: enq1_face_to.uuid, description: 'アンケ1TOページ3')
enq1_to_page2 = EnqPage.create(enq_face_id: enq1_face_to.uuid, description: 'アンケ1TOページ2', next_page_id: enq1_to_page3.uuid)
enq1_to_page1 = EnqPage.create(enq_face_id: enq1_face_to.uuid, description: 'アンケ1TOページ1', next_page_id: enq1_to_page2.uuid)
enq1_face_to.first_page_id = enq1_to_page1.uuid
enq1_face_to.save

enq1_pc_page2 = EnqPage.create(enq_face_id: enq1_face_pc.uuid, description: 'アンケ1PCページ2')
enq1_pc_page1 = EnqPage.create(enq_face_id: enq1_face_pc.uuid, description: 'アンケ1PCページ1', next_page_id: enq1_pc_page2.uuid)
enq1_face_pc.first_page_id = enq1_pc_page1.uuid
enq1_face_pc.save

enq1_to_q1 = EnqQuestion.create(enq_page_id: enq1_to_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq1_to_q2 = EnqQuestion.create(enq_page_id: enq1_to_page1.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq1_to_q3 = EnqQuestion.create(enq_page_id: enq1_to_page2.uuid, num: 3, seq: 'Q3', question_id: q4.uuid)
enq1_to_q4 = EnqQuestion.create(enq_page_id: enq1_to_page3.uuid, num: 4, seq: 'Q4', question_id: q5.uuid)

enq1_pc_q1 = EnqQuestion.create(enq_page_id: enq1_pc_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq1_pc_q2 = EnqQuestion.create(enq_page_id: enq1_pc_page1.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq1_pc_q3 = EnqQuestion.create(enq_page_id: enq1_pc_page2.uuid, num: 3, seq: 'Q3', question_id: q4.uuid)
enq1_pc_q4 = EnqQuestion.create(enq_page_id: enq1_pc_page2.uuid, num: 4, seq: 'Q4', question_id: q5.uuid)

