# coding: utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# レッグマジック
enq_A = Enq.create(message: nil, complete_button_text: nil)
enq_B = Enq.create(message: nil, complete_button_text: nil)

campaign_A = Campaign.create(mid: '2F8E144A-7AB8-49D9-A49A-LEGMAGGREEAA', mcd: '2F8E144A-7AB8-49D9-A49A-LEGMAGGREEAA', name: 'レッグマジックA', enq_id: enq_A.uuid, platform: 'gree', point: 10, thumbnail: '/css/sp/themes/legmagic/thumbnail.jpg', page_button_text: nil, message: '', thanks_button_text: nil,
                             conversion_tag: '<img src=\'//ad.poncan.jp/complete/image/XXXXXXX\'>', second_picture: '/css/sp/themes/legmagic/2nd_banne.png', client_url: 'http://ad.poncan.jp/click/campaign/259ca10d2f47626b8d0e01f69c086242342b7696/c2a4e3d058790b2d4bf321a612ae360b076a6519', already_button_text: nil)
campaign_B = Campaign.create(mid: '2F8E144A-7AB8-49D9-A49A-LEGMAGGREEBB', mcd: '2F8E144A-7AB8-49D9-A49A-LEGMAGGREEBB', name: 'レッグマジックB', enq_id: enq_B.uuid, platform: 'gree', point: 10, thumbnail: '/css/sp/themes/legmagic/thumbnail.jpg', page_button_text: nil, message: '', thanks_button_text: nil,
                             conversion_tag: '<img src=\'//ad.poncan.jp/complete/image/XXXXXXX\'>', second_picture: '/css/sp/themes/legmagic/2nd_banne.png', client_url: 'http://ad.poncan.jp/click/campaign/185c18e8b58353c4b2c6ab22dda51ed0e4e5830d/c2a4e3d058790b2d4bf321a612ae360b076a6519', already_button_text: nil)

campaign_face_A  = CampaignFace.create(campaign_id: campaign_A.mid, face: 'SP', css: '/css/sp/themes/legmagic/style.css', title: 'CMを見てアンケートに答えてポイントをGET!', description: '')
campaign_face_B  = CampaignFace.create(campaign_id: campaign_B.mid, face: 'SP', css: '/css/sp/themes/legmagic/style.css', title: 'CMを見てアンケートに答えてポイントをGET!', description: '')

movie_A_m3u8 = Movie.create(campaign_id: campaign_A.mid, mime_type: 'application/x-mpegURL', src: 'http://video.poncan.jp/video/legmagic/movie.m3u8', duration: 150)
movie_A_flv  = Movie.create(campaign_id: campaign_A.mid, mime_type: 'video/x-flv', src: 'http://video.poncan.jp/video/legmagic/movie.flv', duration: 150)
movie_A_mp4  = Movie.create(campaign_id: campaign_A.mid, mime_type: 'video/mp4', src: 'http://video.poncan.jp/video/legmagic/movie.mp4', duration: 150)
movie_B_m3u8 = Movie.create(campaign_id: campaign_B.mid, mime_type: 'application/x-mpegURL', src: 'http://video.poncan.jp/video/legmagic/movie.m3u8', duration: 150)
movie_B_flv  = Movie.create(campaign_id: campaign_B.mid, mime_type: 'video/x-flv', src: 'http://video.poncan.jp/video/legmagic/movie.flv', duration: 150)
movie_B_mp4  = Movie.create(campaign_id: campaign_B.mid, mime_type: 'video/mp4', src: 'http://video.poncan.jp/video/legmagic/movie.mp4', duration: 150)

enq_face_A  = EnqFace.create(enq_id: enq_A.uuid, face: 'SP')
enq_face_B  = EnqFace.create(enq_id: enq_B.uuid, face: 'SP')

q1 = Question.create(kind: 'radio', title: '性別をお教えください', required: true)
q2 = Question.create(kind: 'radio', title: '年齢をお答え下さい', required: true)
q3 = Question.create(kind: 'radio', title: '最近ウエスト、脚、ヒップのサイズが気になったことはありますか？', required: true)
q4 = Question.create(kind: 'radio', title: '1セットたった60秒の美脚マシン「レッグマジックX」をご存じでしたか？', required: true)
q5 = Question.create(kind: 'radio', title: '日本人女性の25人の1人が持っている「レッグマジックX」であなたも理想の脚線美を手に入れたいですか？', required: true)
q6 = Question.create(kind: 'radio', title: '「レッグマジックX」200万台突破記念キャンペーン、グリーコインプレゼントを申込みたいと思いますか。', required: true)

q1_c1 = Choice.create(question_id: q1.uuid, order: 1, content: '男性')
q1_c2 = Choice.create(question_id: q1.uuid, order: 2, content: '女性')

q2_c1 = Choice.create(question_id: q2.uuid, order: 1, content: '19歳以下')
q2_c2 = Choice.create(question_id: q2.uuid, order: 2, content: '20-29歳')
q2_c3 = Choice.create(question_id: q2.uuid, order: 3, content: '30-39歳')
q2_c4 = Choice.create(question_id: q2.uuid, order: 4, content: '40-49歳')
q2_c5 = Choice.create(question_id: q2.uuid, order: 5, content: '50歳以上')

q3_c1 = Choice.create(question_id: q3.uuid, order: 1, content: 'ある')
q3_c2 = Choice.create(question_id: q3.uuid, order: 2, content: 'ない')

q4_c1 = Choice.create(question_id: q4.uuid, order: 1, content: 'はい')
q4_c2 = Choice.create(question_id: q4.uuid, order: 2, content: 'いいえ')

q5_c1 = Choice.create(question_id: q5.uuid, order: 1, content: 'そう思う')
q5_c2 = Choice.create(question_id: q5.uuid, order: 2, content: 'どちらかと言えばそう思う')
q5_c3 = Choice.create(question_id: q5.uuid, order: 3, content: 'どちらとも思わない')
q5_c4 = Choice.create(question_id: q5.uuid, order: 4, content: 'どちらかと言えばそう思わない')
q5_c5 = Choice.create(question_id: q5.uuid, order: 5, content: 'そう思わない')

q6_c1 = Choice.create(question_id: q6.uuid, order: 1, content: 'そう思う')
q6_c2 = Choice.create(question_id: q6.uuid, order: 2, content: 'どちらかと言えばそう思う')
q6_c3 = Choice.create(question_id: q6.uuid, order: 3, content: 'どちらとも思わない')
q6_c4 = Choice.create(question_id: q6.uuid, order: 4, content: 'どちらかと言えばそう思わない')
q6_c5 = Choice.create(question_id: q6.uuid, order: 5, content: 'そう思わない')

enq_A_page6 = EnqPage.create(enq_face_id: enq_face_A.uuid)
enq_A_page5 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page6.uuid)
enq_A_page4 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page5.uuid)
enq_A_page3 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page4.uuid)
enq_A_page2 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page3.uuid)
enq_A_page1 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page2.uuid)
enq_face_A.first_page_id = enq_A_page1.uuid
enq_face_A.save

enq_B_page6 = EnqPage.create(enq_face_id: enq_face_B.uuid)
enq_B_page5 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page6.uuid)
enq_B_page4 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page5.uuid)
enq_B_page3 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page4.uuid)
enq_B_page2 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page3.uuid)
enq_B_page1 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page2.uuid)
enq_face_B.first_page_id = enq_B_page1.uuid
enq_face_B.save

enq_A_q1 = EnqQuestion.create(enq_page_id: enq_A_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_A_q2 = EnqQuestion.create(enq_page_id: enq_A_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_A_q3 = EnqQuestion.create(enq_page_id: enq_A_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_A_q4 = EnqQuestion.create(enq_page_id: enq_A_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_A_q5 = EnqQuestion.create(enq_page_id: enq_A_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_A_q6 = EnqQuestion.create(enq_page_id: enq_A_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)

enq_B_q1 = EnqQuestion.create(enq_page_id: enq_B_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_B_q2 = EnqQuestion.create(enq_page_id: enq_B_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_B_q3 = EnqQuestion.create(enq_page_id: enq_B_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_B_q4 = EnqQuestion.create(enq_page_id: enq_B_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_B_q5 = EnqQuestion.create(enq_page_id: enq_B_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_B_q6 = EnqQuestion.create(enq_page_id: enq_B_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)


# パワープランニング
enq   = Enq.create(message: nil, complete_button_text: nil)
enq_A = Enq.create(message: nil, complete_button_text: nil)
enq_B = Enq.create(message: nil, complete_button_text: nil)

campaign   = Campaign.create(mid: 'D75D30FA-0B6F-4800-A8BF-HOKENADVMIXI', mcd: 'D75D30FA-0B6F-4800-A8BF-HOKENADVMIXI', name: 'パワープランニング', enq_id: enq.uuid, platform: 'mixi', point: 10, thumbnail: '/css/sp/themes/powerplaning/thumbnail.jpg', page_button_text: nil, message: '', thanks_button_text: nil,
                             conversion_tag: '<img src=\'//ad.poncan.jp/complete/image/XXXXXXX\'>', second_picture: '/css/sp/themes/powerplaning/2nd_banne.png', client_url: 'http://ad.poncan.jp/click/campaign/cbf2d8169ffbb345565e1bfe4c3beddcad472f15/324a0bb5d1f22337abb7dc891ce22283fc6708ac', already_button_text: nil)
campaign_A = Campaign.create(mid: 'D75D30FA-0B6F-4800-A8BF-HOKENADGREEA', mcd: 'D75D30FA-0B6F-4800-A8BF-HOKENADGREEA', name: 'パワープランニングA', enq_id: enq_A.uuid, platform: 'gree', point: 10, thumbnail: '/css/sp/themes/powerplaning/thumbnail.jpg', page_button_text: nil, message: '', thanks_button_text: nil,
                             conversion_tag: '<img src=\'//ad.poncan.jp/complete/image/XXXXXXX\'>', second_picture: '/css/sp/themes/powerplaning/2nd_banne.png', client_url: 'http://ad.poncan.jp/click/campaign/259ca10d2f47626b8d0e01f69c086242342b7696/c2a4e3d058790b2d4bf321a612ae360b076a6519', already_button_text: nil)
campaign_B = Campaign.create(mid: 'D75D30FA-0B6F-4800-A8BF-HOKENADGREEB', mcd: 'D75D30FA-0B6F-4800-A8BF-HOKENADGREEB', name: 'パワープランニングB', enq_id: enq_B.uuid, platform: 'gree', point: 10, thumbnail: '/css/sp/themes/powerplaning/thumbnail.jpg', page_button_text: nil, message: '', thanks_button_text: nil,
                             conversion_tag: '<img src=\'//ad.poncan.jp/complete/image/XXXXXXX\'>', second_picture: '/css/sp/themes/powerplaning/2nd_banne.png', client_url: 'http://ad.poncan.jp/click/campaign/259ca10d2f47626b8d0e01f69c086242342b7696/c2a4e3d058790b2d4bf321a612ae360b076a6519', already_button_text: nil)

campaign_face   = CampaignFace.create(campaign_id: campaign.mid, face: 'SP', css: '/css/sp/themes/powerplaning/style.css', title: 'CMを見てアンケートに答えてポイントをGET!', description: '')
campaign_face_A = CampaignFace.create(campaign_id: campaign_A.mid, face: 'SP', css: '/css/sp/themes/powerplaning/style.css', title: 'CMを見てアンケートに答えてポイントをGET!', description: '')
campaign_face_B = CampaignFace.create(campaign_id: campaign_B.mid, face: 'SP', css: '/css/sp/themes/powerplaning/style.css', title: 'CMを見てアンケートに答えてポイントをGET!', description: '')

movie_m3u8   = Movie.create(campaign_id: campaign.mid, mime_type: 'application/x-mpegURL', src: 'http://video.poncan.jp/video/powerplaning/movie.m3u8', duration: 0)
movie_flv    = Movie.create(campaign_id: campaign.mid, mime_type: 'video/x-flv', src: 'http://video.poncan.jp/video/powerplaning/movie.flv', duration: 0)
movie_mp4    = Movie.create(campaign_id: campaign.mid, mime_type: 'video/mp4', src: 'http://video.poncan.jp/video/powerplaning/movie.mp4', duration: 0)
movie_A_m3u8 = Movie.create(campaign_id: campaign_A.mid, mime_type: 'application/x-mpegURL', src: 'http://video.poncan.jp/video/powerplaning/movie.m3u8', duration: 0)
movie_A_flv  = Movie.create(campaign_id: campaign_A.mid, mime_type: 'video/x-flv', src: 'http://video.poncan.jp/video/powerplaning/movie.flv', duration: 0)
movie_A_mp4  = Movie.create(campaign_id: campaign_A.mid, mime_type: 'video/mp4', src: 'http://video.poncan.jp/video/powerplaning/movie.mp4', duration: 0)
movie_B_m3u8 = Movie.create(campaign_id: campaign_B.mid, mime_type: 'application/x-mpegURL', src: 'http://video.poncan.jp/video/powerplaning/movie.m3u8', duration: 0)
movie_B_flv  = Movie.create(campaign_id: campaign_B.mid, mime_type: 'video/x-flv', src: 'http://video.poncan.jp/video/powerplaning/movie.flv', duration: 0)
movie_B_mp4  = Movie.create(campaign_id: campaign_B.mid, mime_type: 'video/mp4', src: 'http://video.poncan.jp/video/powerplaning/movie.mp4', duration: 0)

enq_face    = EnqFace.create(enq_id: enq.uuid, face: 'SP')
enq_face_A  = EnqFace.create(enq_id: enq_A.uuid, face: 'SP')
enq_face_B  = EnqFace.create(enq_id: enq_B.uuid, face: 'SP')

q1_M = Question.create(kind: 'radio', title: '性別をお教えください', required: true)
q2_M = Question.create(kind: 'radio', title: '年齢をお答え下さい', required: true)
q3_M = Question.create(kind: 'radio', title: 'あなたが加入している生命保険のひと月あたりの保険料についてどう感じていますか？', required: true)
q4_M = Question.create(kind: 'radio', title: 'あなたは所得税で最高12万円の控除を受け取ることができる新生命保険料控除制度を知っていますか？', required: true)
q5_M = Question.create(kind: 'radio', title: '生命保険のプロが複数会社のメニューから保険料節約などの最適プランを診断出来る無料相談サービスをご存知ですか？', required: true)
q6_M = Question.create(kind: 'radio', title: 'mixiポイントがプレゼントされる「みんなの生命保険アドバイザー」のお得な無料相談についてどう思いますか？', required: true)

q1_c1 = Choice.create(question_id: q1_M.uuid, order: 1, content: '男性')
q1_c2 = Choice.create(question_id: q1_M.uuid, order: 2, content: '女性')

q2_c1 = Choice.create(question_id: q2_M.uuid, order: 1, content: '19歳以下')
q2_c2 = Choice.create(question_id: q2_M.uuid, order: 2, content: '20-29歳')
q2_c3 = Choice.create(question_id: q2_M.uuid, order: 3, content: '30-39歳')
q2_c4 = Choice.create(question_id: q2_M.uuid, order: 4, content: '40-49歳')
q2_c5 = Choice.create(question_id: q2_M.uuid, order: 5, content: '50歳以上')

q3_c1 = Choice.create(question_id: q3_M.uuid, order: 1, content: '高いと感じている')
q3_c2 = Choice.create(question_id: q3_M.uuid, order: 2, content: '普通と感じている')
q3_c3 = Choice.create(question_id: q3_M.uuid, order: 3, content: '安いと感じている')
q3_c4 = Choice.create(question_id: q3_M.uuid, order: 4, content: '加入していない')

q4_c1 = Choice.create(question_id: q4_M.uuid, order: 1, content: '知っている')
q4_c2 = Choice.create(question_id: q4_M.uuid, order: 2, content: '知らない')

q5_c1 = Choice.create(question_id: q5_M.uuid, order: 1, content: '聞いたことはある')
q5_c2 = Choice.create(question_id: q5_M.uuid, order: 2, content: '知らなかった')
q5_c3 = Choice.create(question_id: q5_M.uuid, order: 3, content: '知っていた')
q5_c4 = Choice.create(question_id: q5_M.uuid, order: 4, content: '利用したことがある')

q6_c1 = Choice.create(question_id: q6_M.uuid, order: 1, content: '参加してみたい')
q6_c2 = Choice.create(question_id: q6_M.uuid, order: 2, content: '興味はある')
q6_c3 = Choice.create(question_id: q6_M.uuid, order: 3, content: '機会があれば参加してみたい')
q6_c4 = Choice.create(question_id: q6_M.uuid, order: 4, content: 'もう少し詳細を知りたい')
q6_c5 = Choice.create(question_id: q6_M.uuid, order: 5, content: '参加したくない')

q1_G = Question.create(kind: 'radio', title: '性別をお教えください', required: true)
q2_G = Question.create(kind: 'radio', title: '年齢をお答え下さい', required: true)
q3_G = Question.create(kind: 'radio', title: 'あなたが加入している生命保険のひと月あたりの保険料についてどう感じていますか？', required: true)
q4_G = Question.create(kind: 'radio', title: 'あなたは所得税で最高12万円の控除を受け取ることができる新生命保険料控除制度を知っていますか？', required: true)
q5_G = Question.create(kind: 'radio', title: '生命保険のプロが複数会社のメニューから保険料節約などの最適プランを診断出来る無料相談サービスをご存知ですか？', required: true)
q6_G = Question.create(kind: 'radio', title: 'GREEコインがプレゼントされる「みんなの生命保険アドバイザー」のお得な無料相談についてどう思いますか？', required: true)

q1_c1 = Choice.create(question_id: q1_G.uuid, order: 1, content: '男性')
q1_c2 = Choice.create(question_id: q1_G.uuid, order: 2, content: '女性')

q2_c1 = Choice.create(question_id: q2_G.uuid, order: 1, content: '19歳以下')
q2_c2 = Choice.create(question_id: q2_G.uuid, order: 2, content: '20-29歳')
q2_c3 = Choice.create(question_id: q2_G.uuid, order: 3, content: '30-39歳')
q2_c4 = Choice.create(question_id: q2_G.uuid, order: 4, content: '40-49歳')
q2_c5 = Choice.create(question_id: q2_G.uuid, order: 5, content: '50歳以上')

q3_c1 = Choice.create(question_id: q3_G.uuid, order: 1, content: '高いと感じている')
q3_c2 = Choice.create(question_id: q3_G.uuid, order: 2, content: '普通と感じている')
q3_c3 = Choice.create(question_id: q3_G.uuid, order: 3, content: '安いと感じている')
q3_c4 = Choice.create(question_id: q3_G.uuid, order: 4, content: '加入していない')

q4_c1 = Choice.create(question_id: q4_G.uuid, order: 1, content: '知っている')
q4_c2 = Choice.create(question_id: q4_G.uuid, order: 2, content: '知らない')

q5_c1 = Choice.create(question_id: q5_G.uuid, order: 1, content: '聞いたことはある')
q5_c2 = Choice.create(question_id: q5_G.uuid, order: 2, content: '知らなかった')
q5_c3 = Choice.create(question_id: q5_G.uuid, order: 3, content: '知っていた')
q5_c4 = Choice.create(question_id: q5_G.uuid, order: 4, content: '利用したことがある')

q6_c1 = Choice.create(question_id: q6_G.uuid, order: 1, content: '参加してみたい')
q6_c2 = Choice.create(question_id: q6_G.uuid, order: 2, content: '興味はある')
q6_c3 = Choice.create(question_id: q6_G.uuid, order: 3, content: '機会があれば参加してみたい')
q6_c4 = Choice.create(question_id: q6_G.uuid, order: 4, content: 'もう少し詳細を知りたい')
q6_c5 = Choice.create(question_id: q6_G.uuid, order: 5, content: '参加したくない')

enq_page6 = EnqPage.create(enq_face_id: enq_face.uuid)
enq_page5 = EnqPage.create(enq_face_id: enq_face.uuid, next_page_id: enq_page6.uuid)
enq_page4 = EnqPage.create(enq_face_id: enq_face.uuid, next_page_id: enq_page5.uuid)
enq_page3 = EnqPage.create(enq_face_id: enq_face.uuid, next_page_id: enq_page4.uuid)
enq_page2 = EnqPage.create(enq_face_id: enq_face.uuid, next_page_id: enq_page3.uuid)
enq_page1 = EnqPage.create(enq_face_id: enq_face.uuid, next_page_id: enq_page2.uuid)
enq_face.first_page_id = enq_page1.uuid
enq_face.save

enq_A_page6 = EnqPage.create(enq_face_id: enq_face_A.uuid)
enq_A_page5 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page6.uuid)
enq_A_page4 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page5.uuid)
enq_A_page3 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page4.uuid)
enq_A_page2 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page3.uuid)
enq_A_page1 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page2.uuid)
enq_face_A.first_page_id = enq_A_page1.uuid
enq_face_A.save

enq_B_page6 = EnqPage.create(enq_face_id: enq_face_B.uuid)
enq_B_page5 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page6.uuid)
enq_B_page4 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page5.uuid)
enq_B_page3 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page4.uuid)
enq_B_page2 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page3.uuid)
enq_B_page1 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page2.uuid)
enq_face_B.first_page_id = enq_B_page1.uuid
enq_face_B.save

enq_q1 = EnqQuestion.create(enq_page_id: enq_page1.uuid, num: 1, seq: 'Q1', question_id: q1_M.uuid)
enq_q2 = EnqQuestion.create(enq_page_id: enq_page2.uuid, num: 2, seq: 'Q2', question_id: q2_M.uuid)
enq_q3 = EnqQuestion.create(enq_page_id: enq_page3.uuid, num: 3, seq: 'Q3', question_id: q3_M.uuid)
enq_q4 = EnqQuestion.create(enq_page_id: enq_page4.uuid, num: 4, seq: 'Q4', question_id: q4_M.uuid)
enq_q5 = EnqQuestion.create(enq_page_id: enq_page5.uuid, num: 5, seq: 'Q5', question_id: q5_M.uuid)
enq_q6 = EnqQuestion.create(enq_page_id: enq_page6.uuid, num: 6, seq: 'Q6', question_id: q6_M.uuid)

enq_A_q1 = EnqQuestion.create(enq_page_id: enq_A_page1.uuid, num: 1, seq: 'Q1', question_id: q1_G.uuid)
enq_A_q2 = EnqQuestion.create(enq_page_id: enq_A_page2.uuid, num: 2, seq: 'Q2', question_id: q2_G.uuid)
enq_A_q3 = EnqQuestion.create(enq_page_id: enq_A_page3.uuid, num: 3, seq: 'Q3', question_id: q3_G.uuid)
enq_A_q4 = EnqQuestion.create(enq_page_id: enq_A_page4.uuid, num: 4, seq: 'Q4', question_id: q4_G.uuid)
enq_A_q5 = EnqQuestion.create(enq_page_id: enq_A_page5.uuid, num: 5, seq: 'Q5', question_id: q5_G.uuid)
enq_A_q6 = EnqQuestion.create(enq_page_id: enq_A_page6.uuid, num: 6, seq: 'Q6', question_id: q6_G.uuid)

enq_B_q1 = EnqQuestion.create(enq_page_id: enq_B_page1.uuid, num: 1, seq: 'Q1', question_id: q1_G.uuid)
enq_B_q2 = EnqQuestion.create(enq_page_id: enq_B_page2.uuid, num: 2, seq: 'Q2', question_id: q2_G.uuid)
enq_B_q3 = EnqQuestion.create(enq_page_id: enq_B_page3.uuid, num: 3, seq: 'Q3', question_id: q3_G.uuid)
enq_B_q4 = EnqQuestion.create(enq_page_id: enq_B_page4.uuid, num: 4, seq: 'Q4', question_id: q4_G.uuid)
enq_B_q5 = EnqQuestion.create(enq_page_id: enq_B_page5.uuid, num: 5, seq: 'Q5', question_id: q5_G.uuid)
enq_B_q6 = EnqQuestion.create(enq_page_id: enq_B_page6.uuid, num: 6, seq: 'Q6', question_id: q6_G.uuid)


# ヤーマン
enq   = Enq.create(message: nil, complete_button_text: nil)
enq_A = Enq.create(message: nil, complete_button_text: nil)
enq_B = Enq.create(message: nil, complete_button_text: nil)

campaign   = Campaign.create(mid: 'YAMANXXX-MIXI-MIXI-XXXX-YAMANMIXIXXX', mcd: 'YAMANXXX-MIXI-MIXI-XXXX-YAMANMIXIXXX', name: 'ヤーマン', enq_id: enq.uuid, platform: 'mixi', point: 10, thumbnail: '/css/sp/themes/ya-man/thumbnail.jpg', page_button_text: nil, message: '', thanks_button_text: nil,
                             conversion_tag: '<img src=\'//ad.poncan.jp/complete/image/XXXXXXX\'>', second_picture: '/css/sp/themes/ya-man/2nd_banne.png', client_url: 'http://ad.poncan.jp/click/campaign/3649e845023252fee8d58c18f82c6c9494de180f/324a0bb5d1f22337abb7dc891ce22283fc6708ac', already_button_text: nil)
campaign_A = Campaign.create(mid: 'YAMANAAA-GREE-GREE-AAAA-YAMANGREEAAA', mcd: 'YAMANAAA-GREE-GREE-AAAA-YAMANGREEAAA', name: 'ヤーマンA', enq_id: enq_A.uuid, platform: 'gree', point: 10, thumbnail: '/css/sp/themes/ya-man/thumbnail.jpg', page_button_text: nil, message: '', thanks_button_text: nil,
                             conversion_tag: '<img src=\'//ad.poncan.jp/complete/image/XXXXXXX\'>', second_picture: '/css/sp/themes/ya-man/2nd_banne.png', client_url: 'http://ad.poncan.jp/click/campaign/a5a8c77c8e0ee606960a7bb9ded88a30bb2f485f/c2a4e3d058790b2d4bf321a612ae360b076a6519', already_button_text: nil)
campaign_B = Campaign.create(mid: 'YAMANBBB-GREE-GREE-BBBB-YAMANGREEBBB', mcd: 'YAMANBBB-GREE-GREE-BBBB-YAMANGREEBBB', name: 'ヤーマンB', enq_id: enq_B.uuid, platform: 'gree', point: 10, thumbnail: '/css/sp/themes/ya-man/thumbnail.jpg', page_button_text: nil, message: '', thanks_button_text: nil,
                             conversion_tag: '<img src=\'//ad.poncan.jp/complete/image/XXXXXXX\'>', second_picture: '/css/sp/themes/ya-man/2nd_banne.png', client_url: 'http://ad.poncan.jp/click/campaign/a5a8c77c8e0ee606960a7bb9ded88a30bb2f485f/c2a4e3d058790b2d4bf321a612ae360b076a6519', already_button_text: nil)

campaign_face   = CampaignFace.create(campaign_id: campaign.mid, face: 'SP', css: '/css/sp/themes/ya-man/style.css', title: 'CMを見てアンケートに答えてポイントをGET!', description: '')
campaign_face_A = CampaignFace.create(campaign_id: campaign_A.mid, face: 'SP', css: '/css/sp/themes/ya-man/style.css', title: 'CMを見てアンケートに答えてポイントをGET!', description: '')
campaign_face_B = CampaignFace.create(campaign_id: campaign_B.mid, face: 'SP', css: '/css/sp/themes/ya-man/style.css', title: 'CMを見てアンケートに答えてポイントをGET!', description: '')

movie_m3u8   = Movie.create(campaign_id: campaign.mid, mime_type: 'application/x-mpegURL', src: 'http://video.poncan.jp/video/ya-man/movie.m3u8', duration: 0)
movie_flv    = Movie.create(campaign_id: campaign.mid, mime_type: 'video/x-flv', src: 'http://video.poncan.jp/video/ya-man/movie.flv', duration: 0)
movie_mp4    = Movie.create(campaign_id: campaign.mid, mime_type: 'video/mp4', src: 'http://video.poncan.jp/video/ya-man/movie.mp4', duration: 0)
movie_A_m3u8 = Movie.create(campaign_id: campaign_A.mid, mime_type: 'application/x-mpegURL', src: 'http://video.poncan.jp/video/ya-man/movie.m3u8', duration: 0)
movie_A_flv  = Movie.create(campaign_id: campaign_A.mid, mime_type: 'video/x-flv', src: 'http://video.poncan.jp/video/ya-man/movie.flv', duration: 0)
movie_A_mp4  = Movie.create(campaign_id: campaign_A.mid, mime_type: 'video/mp4', src: 'http://video.poncan.jp/video/ya-man/movie.mp4', duration: 0)
movie_B_m3u8 = Movie.create(campaign_id: campaign_B.mid, mime_type: 'application/x-mpegURL', src: 'http://video.poncan.jp/video/ya-man/movie.m3u8', duration: 0)
movie_B_flv  = Movie.create(campaign_id: campaign_B.mid, mime_type: 'video/x-flv', src: 'http://video.poncan.jp/video/ya-man/movie.flv', duration: 0)
movie_B_mp4  = Movie.create(campaign_id: campaign_B.mid, mime_type: 'video/mp4', src: 'http://video.poncan.jp/video/ya-man/movie.mp4', duration: 0)

enq_face    = EnqFace.create(enq_id: enq.uuid, face: 'SP')
enq_face_A  = EnqFace.create(enq_id: enq_A.uuid, face: 'SP')
enq_face_B  = EnqFace.create(enq_id: enq_B.uuid, face: 'SP')

q1 = Question.create(kind: 'radio', title: '性別をお教えください', required: true)
q2 = Question.create(kind: 'radio', title: '年齢をお答え下さい', required: true)
q3 = Question.create(kind: 'radio', title: 'このCMをご覧になって「no!no!HAIR」に興味を持たれましたか？', required: true)
q4 = Question.create(kind: 'radio', title: 'このCMをご覧になって「no!no!HAIR」を買ってみたいと思いましたか？', required: true)
q5 = Question.create(kind: 'radio', title: '「no!no!HAIR」を以前からご存知でしたか？', required: true)
q6 = Question.create(kind: 'radio', title: '最後に今回のCMを再生したきっかけを教えてください。', required: true)

q1_c1 = Choice.create(question_id: q1.uuid, order: 1, content: '男性')
q1_c2 = Choice.create(question_id: q1.uuid, order: 2, content: '女性')

q2_c1 = Choice.create(question_id: q2.uuid, order: 1, content: '19歳以下')
q2_c2 = Choice.create(question_id: q2.uuid, order: 2, content: '20-29歳')
q2_c3 = Choice.create(question_id: q2.uuid, order: 3, content: '30-39歳')
q2_c4 = Choice.create(question_id: q2.uuid, order: 4, content: '40-49歳')
q2_c5 = Choice.create(question_id: q2.uuid, order: 5, content: '50歳以上')

q3_c1 = Choice.create(question_id: q3.uuid, order: 1, content: '興味を持った')
q3_c2 = Choice.create(question_id: q3.uuid, order: 2, content: 'どちらかと言えば興味を持った')
q3_c3 = Choice.create(question_id: q3.uuid, order: 3, content: 'どちらとも言えない')
q3_c4 = Choice.create(question_id: q3.uuid, order: 4, content: 'どちらかと言えば興味は持たなかった')
q3_c5 = Choice.create(question_id: q3.uuid, order: 4, content: '興味は持たなかった')

q4_c1 = Choice.create(question_id: q4.uuid, order: 1, content: '買ってみたい')
q4_c2 = Choice.create(question_id: q4.uuid, order: 2, content: 'どちらかと言えば買ってみたい')
q4_c3 = Choice.create(question_id: q4.uuid, order: 1, content: 'どちらともいえない')
q4_c4 = Choice.create(question_id: q4.uuid, order: 2, content: 'どちらかと言えば買ってみたくはない')
q4_c5 = Choice.create(question_id: q4.uuid, order: 1, content: '買ってみたくはない')

q5_c1 = Choice.create(question_id: q5.uuid, order: 1, content: '以前から知っていた')
q5_c2 = Choice.create(question_id: q5.uuid, order: 2, content: '見たことがある')
q5_c3 = Choice.create(question_id: q5.uuid, order: 3, content: '知らなかった')

q6_c1 = Choice.create(question_id: q6.uuid, order: 1, content: '商品が気になったから')
q6_c2 = Choice.create(question_id: q6.uuid, order: 2, content: 'ポイントがついていたから')
q6_c3 = Choice.create(question_id: q6.uuid, order: 3, content: '動画が面白そうだったから')

enq_page6 = EnqPage.create(enq_face_id: enq_face.uuid)
enq_page5 = EnqPage.create(enq_face_id: enq_face.uuid, next_page_id: enq_page6.uuid)
enq_page4 = EnqPage.create(enq_face_id: enq_face.uuid, next_page_id: enq_page5.uuid)
enq_page3 = EnqPage.create(enq_face_id: enq_face.uuid, next_page_id: enq_page4.uuid)
enq_page2 = EnqPage.create(enq_face_id: enq_face.uuid, next_page_id: enq_page3.uuid)
enq_page1 = EnqPage.create(enq_face_id: enq_face.uuid, next_page_id: enq_page2.uuid)
enq_face.first_page_id = enq_page1.uuid
enq_face.save

enq_A_page6 = EnqPage.create(enq_face_id: enq_face_A.uuid)
enq_A_page5 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page6.uuid)
enq_A_page4 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page5.uuid)
enq_A_page3 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page4.uuid)
enq_A_page2 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page3.uuid)
enq_A_page1 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page2.uuid)
enq_face_A.first_page_id = enq_A_page1.uuid
enq_face_A.save

enq_B_page6 = EnqPage.create(enq_face_id: enq_face_B.uuid)
enq_B_page5 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page6.uuid)
enq_B_page4 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page5.uuid)
enq_B_page3 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page4.uuid)
enq_B_page2 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page3.uuid)
enq_B_page1 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page2.uuid)
enq_face_B.first_page_id = enq_B_page1.uuid
enq_face_B.save

enq_q1 = EnqQuestion.create(enq_page_id: enq_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_q2 = EnqQuestion.create(enq_page_id: enq_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_q3 = EnqQuestion.create(enq_page_id: enq_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_q4 = EnqQuestion.create(enq_page_id: enq_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_q5 = EnqQuestion.create(enq_page_id: enq_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_q6 = EnqQuestion.create(enq_page_id: enq_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)

enq_A_q1 = EnqQuestion.create(enq_page_id: enq_A_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_A_q2 = EnqQuestion.create(enq_page_id: enq_A_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_A_q3 = EnqQuestion.create(enq_page_id: enq_A_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_A_q4 = EnqQuestion.create(enq_page_id: enq_A_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_A_q5 = EnqQuestion.create(enq_page_id: enq_A_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_A_q6 = EnqQuestion.create(enq_page_id: enq_A_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)

enq_B_q1 = EnqQuestion.create(enq_page_id: enq_B_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_B_q2 = EnqQuestion.create(enq_page_id: enq_B_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_B_q3 = EnqQuestion.create(enq_page_id: enq_B_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_B_q4 = EnqQuestion.create(enq_page_id: enq_B_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_B_q5 = EnqQuestion.create(enq_page_id: enq_B_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_B_q6 = EnqQuestion.create(enq_page_id: enq_B_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)


# 養命酒
enq_A = Enq.create(message: nil, complete_button_text: nil)
enq_B = Enq.create(message: nil, complete_button_text: nil)

campaign_A = Campaign.create(mid: 'YOMEISHU-GREE-GREE-AAAA-YOMEISHUGREE', mcd: 'YOMEISHU-GREE-GREE-AAAA-YOMEISHUGREE', name: '養命酒A', enq_id: enq_A.uuid, platform: 'gree', point: 10, thumbnail: '/css/sp/themes/yomeishu/thumbnail.jpg', page_button_text: nil, message: '', thanks_button_text: nil,
                             conversion_tag: '<img src=\'//ad.poncan.jp/complete/image/XXXXXXX\'>', second_picture: '/css/sp/themes/yomeishu/2nd_banne.png', client_url: 'http://ad.poncan.jp/click/campaign/a5a8c77c8e0ee606960a7bb9ded88a30bb2f485f/c2a4e3d058790b2d4bf321a612ae360b076a6519', already_button_text: nil)
campaign_B = Campaign.create(mid: 'YOMEISHU-GREE-GREE-BBBB-YOMEISHUGREE', mcd: 'YOMEISHU-GREE-GREE-BBBB-YOMEISHUGREE', name: '養命酒B', enq_id: enq_B.uuid, platform: 'gree', point: 10, thumbnail: '/css/sp/themes/yomeishu/thumbnail.jpg', page_button_text: nil, message: '', thanks_button_text: nil,
                             conversion_tag: '<img src=\'//ad.poncan.jp/complete/image/XXXXXXX\'>', second_picture: '/css/sp/themes/yomeishu/2nd_banne.png', client_url: 'http://ad.poncan.jp/click/campaign/a5a8c77c8e0ee606960a7bb9ded88a30bb2f485f/c2a4e3d058790b2d4bf321a612ae360b076a6519', already_button_text: nil)

campaign_face_A  = CampaignFace.create(campaign_id: campaign_A.mid, face: 'SP', css: '/css/sp/themes/yomeishu/style.css', title: 'CMを見てアンケートに答えてポイントをGET!', description: '')
campaign_face_B  = CampaignFace.create(campaign_id: campaign_B.mid, face: 'SP', css: '/css/sp/themes/yomeishu/style.css', title: 'CMを見てアンケートに答えてポイントをGET!', description: '')

movie_A_m3u8 = Movie.create(campaign_id: campaign_A.mid, mime_type: 'application/x-mpegURL', src: 'http://video.poncan.jp/video/yomeishu/movie.m3u8', duration: 0)
movie_A_flv  = Movie.create(campaign_id: campaign_A.mid, mime_type: 'video/x-flv', src: 'http://video.poncan.jp/video/yomeishu/movie.flv', duration: 0)
movie_A_mp4  = Movie.create(campaign_id: campaign_A.mid, mime_type: 'video/mp4', src: 'http://video.poncan.jp/video/yomeishu/movie.mp4', duration: 0)
movie_B_m3u8 = Movie.create(campaign_id: campaign_B.mid, mime_type: 'application/x-mpegURL', src: 'http://video.poncan.jp/video/yomeishu/movie.m3u8', duration: 0)
movie_B_flv  = Movie.create(campaign_id: campaign_B.mid, mime_type: 'video/x-flv', src: 'http://video.poncan.jp/video/yomeishu/movie.flv', duration: 0)
movie_B_mp4  = Movie.create(campaign_id: campaign_B.mid, mime_type: 'video/mp4', src: 'http://video.poncan.jp/video/yomeishu/movie.mp4', duration: 0)

enq_face_A  = EnqFace.create(enq_id: enq_A.uuid, face: 'SP')
enq_face_B  = EnqFace.create(enq_id: enq_B.uuid, face: 'SP')

q1 = Question.create(kind: 'radio', title: '性別をお教えください', required: true)
q2 = Question.create(kind: 'radio', title: '年齢をお答え下さい', required: true)
q3 = Question.create(kind: 'radio', title: 'このCMをご覧になって「ハーブの恵み」の香りに興味を持たれましたか？', required: true)
q4 = Question.create(kind: 'radio', title: 'このCMをご覧になって「ハーブの恵み」を飲んでみたいと思いましたか？', required: true)
q5 = Question.create(kind: 'radio', title: 'このCMをご覧になって「ハーブの恵み」を買ってみたいと思いましたか？', required: true)
q6 = Question.create(kind: 'radio', title: '「ハーブの恵み スパークリング」を以前からご存知でしたか？', required: true)
q7 = Question.create(kind: 'radio', title: '「ハーブの恵み スパークリング」を飲んだことがありますか？', required: true)
q8 = Question.create(kind: 'radio', title: '「ハーブの恵み」を以前からご存知でしたか？', required: true)
q9 = Question.create(kind: 'radio', title: '「ハーブの恵み」を飲んだことがありますか？', required: true)
q10 = Question.create(kind: 'radio', title: '最後に今回のCMを再生したきっかけを教えてください。', required: true)

q1_c1 = Choice.create(question_id: q1.uuid, order: 1, content: '男性')
q1_c2 = Choice.create(question_id: q1.uuid, order: 2, content: '女性')

q2_c1 = Choice.create(question_id: q2.uuid, order: 1, content: '20~29歳')
q2_c2 = Choice.create(question_id: q2.uuid, order: 2, content: '30~39歳')
q2_c3 = Choice.create(question_id: q2.uuid, order: 3, content: '40~49歳')
q2_c4 = Choice.create(question_id: q2.uuid, order: 4, content: '50~59歳')
q2_c5 = Choice.create(question_id: q2.uuid, order: 5, content: '60歳以上')

q3_c1 = Choice.create(question_id: q3.uuid, order: 1, content: '非常に興味を持った')
q3_c2 = Choice.create(question_id: q3.uuid, order: 2, content: 'やや興味を持った')
q3_c3 = Choice.create(question_id: q3.uuid, order: 3, content: 'どちらともいえない')
q3_c4 = Choice.create(question_id: q3.uuid, order: 4, content: 'あまり興味は持たなかった')
q3_c5 = Choice.create(question_id: q3.uuid, order: 5, content: 'まったく興味は持たなかった')

q4_c1 = Choice.create(question_id: q4.uuid, order: 1, content: '非常に飲んでみたい')
q4_c2 = Choice.create(question_id: q4.uuid, order: 2, content: 'やや飲んでみたい')
q4_c3 = Choice.create(question_id: q4.uuid, order: 3, content: 'どちらともいえない')
q4_c4 = Choice.create(question_id: q4.uuid, order: 4, content: 'あまり飲んでみたくない')
q4_c5 = Choice.create(question_id: q4.uuid, order: 5, content: 'まったく飲んでみたくない')

q5_c1 = Choice.create(question_id: q5.uuid, order: 1, content: '非常に買ってみたい')
q5_c2 = Choice.create(question_id: q5.uuid, order: 2, content: 'やや買ってみたい')
q5_c3 = Choice.create(question_id: q5.uuid, order: 3, content: 'どちらともいえない')
q5_c4 = Choice.create(question_id: q5.uuid, order: 4, content: 'あまり買ってみたくはない')
q5_c5 = Choice.create(question_id: q5.uuid, order: 5, content: 'まったく買ってみたくはない')

q6_c1 = Choice.create(question_id: q6.uuid, order: 1, content: '以前から知っていた')
q6_c2 = Choice.create(question_id: q6.uuid, order: 2, content: '今回はじめて知った')

q7_c1 = Choice.create(question_id: q7.uuid, order: 1, content: '購入して飲んだことがある')
q7_c2 = Choice.create(question_id: q7.uuid, order: 2, content: '試飲会や試供品で飲んだことがある')
q7_c3 = Choice.create(question_id: q7.uuid, order: 3, content: '飲んだことはない')

q8_c1 = Choice.create(question_id: q8.uuid, order: 1, content: '以前から知っていた')
q8_c2 = Choice.create(question_id: q8.uuid, order: 2, content: '今回初めて知った')

q9_c1 = Choice.create(question_id: q9.uuid, order: 1, content: '購入して飲んだことがある')
q9_c2 = Choice.create(question_id: q9.uuid, order: 2, content: '試飲会や試供品で飲んだことがある')
q9_c3 = Choice.create(question_id: q9.uuid, order: 3, content: '飲んだことはない')

q10_c1 = Choice.create(question_id: q10.uuid, order: 1, content: '商品が気になったから')
q10_c2 = Choice.create(question_id: q10.uuid, order: 2, content: 'ポイントがついていたから')
q10_c3 = Choice.create(question_id: q10.uuid, order: 3, content: '動画が面白そうだったから')

enq_A_page10 = EnqPage.create(enq_face_id: enq_face_A.uuid)
enq_A_page9 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page10.uuid)
enq_A_page8 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page9.uuid)
enq_A_page7 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page8.uuid)
enq_A_page6 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page7.uuid)
enq_A_page5 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page6.uuid)
enq_A_page4 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page5.uuid)
enq_A_page3 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page4.uuid)
enq_A_page2 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page3.uuid)
enq_A_page1 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page2.uuid)
enq_face_A.first_page_id = enq_A_page1.uuid
enq_face_A.save

enq_B_page10 = EnqPage.create(enq_face_id: enq_face_B.uuid)
enq_B_page9 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page10.uuid)
enq_B_page8 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page9.uuid)
enq_B_page7 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page8.uuid)
enq_B_page6 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page7.uuid)
enq_B_page5 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page6.uuid)
enq_B_page4 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page5.uuid)
enq_B_page3 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page4.uuid)
enq_B_page2 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page3.uuid)
enq_B_page1 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page2.uuid)
enq_face_B.first_page_id = enq_B_page1.uuid
enq_face_B.save

enq_A_q1 = EnqQuestion.create(enq_page_id: enq_A_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_A_q2 = EnqQuestion.create(enq_page_id: enq_A_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_A_q3 = EnqQuestion.create(enq_page_id: enq_A_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_A_q4 = EnqQuestion.create(enq_page_id: enq_A_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_A_q5 = EnqQuestion.create(enq_page_id: enq_A_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_A_q6 = EnqQuestion.create(enq_page_id: enq_A_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)
enq_A_q7 = EnqQuestion.create(enq_page_id: enq_A_page7.uuid, num: 7, seq: 'Q7', question_id: q7.uuid)
enq_A_q8 = EnqQuestion.create(enq_page_id: enq_A_page8.uuid, num: 8, seq: 'Q8', question_id: q8.uuid)
enq_A_q9 = EnqQuestion.create(enq_page_id: enq_A_page9.uuid, num: 9, seq: 'Q9', question_id: q9.uuid)
enq_A_q10 = EnqQuestion.create(enq_page_id: enq_A_page10.uuid, num: 10, seq: 'Q10', question_id: q10.uuid)

enq_B_q1 = EnqQuestion.create(enq_page_id: enq_B_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_B_q2 = EnqQuestion.create(enq_page_id: enq_B_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_B_q3 = EnqQuestion.create(enq_page_id: enq_B_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_B_q4 = EnqQuestion.create(enq_page_id: enq_B_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_B_q5 = EnqQuestion.create(enq_page_id: enq_B_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_B_q6 = EnqQuestion.create(enq_page_id: enq_B_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)
enq_B_q7 = EnqQuestion.create(enq_page_id: enq_B_page7.uuid, num: 7, seq: 'Q7', question_id: q7.uuid)
enq_B_q8 = EnqQuestion.create(enq_page_id: enq_B_page8.uuid, num: 8, seq: 'Q8', question_id: q8.uuid)
enq_B_q9 = EnqQuestion.create(enq_page_id: enq_B_page9.uuid, num: 9, seq: 'Q9', question_id: q9.uuid)
enq_B_q10 = EnqQuestion.create(enq_page_id: enq_B_page10.uuid, num: 10, seq: 'Q10', question_id: q10.uuid)


# プラスワン
enq_A = Enq.create(message: nil, complete_button_text: nil)
enq_B = Enq.create(message: nil, complete_button_text: nil)

campaign_A = Campaign.create(mid: '28080715-38D2-432A-8B7A-PLUSONEGREEA', mcd: '28080715-38D2-432A-8B7A-PLUSONEGREEA', name: 'プラスワンA', enq_id: enq_A.uuid, platform: 'gree', point: 10, thumbnail: '/css/sp/themes/plus1g/thumbnail.jpg', page_button_text: nil, message: '', thanks_button_text: nil,
                             conversion_tag: '<img src=\'//ad.poncan.jp/complete/image/XXXXXXX\'>', second_picture: '/css/sp/themes/plus1g/2nd_banne.png', client_url: 'http://ad.poncan.jp/click/campaign/6a433eb5d3c0045398aaefb094d20f31641189bb/c2a4e3d058790b2d4bf321a612ae360b076a6519', already_button_text: nil)
campaign_B = Campaign.create(mid: '28080715-38D2-432A-8B7A-PLUSONEGREEB', mcd: '28080715-38D2-432A-8B7A-PLUSONEGREEB', name: 'プラスワンB', enq_id: enq_B.uuid, platform: 'gree', point: 10, thumbnail: '/css/sp/themes/plus1g/thumbnail.jpg', page_button_text: nil, message: '', thanks_button_text: nil,
                             conversion_tag: '<img src=\'//ad.poncan.jp/complete/image/XXXXXXX\'>', second_picture: '/css/sp/themes/plus1g/2nd_banne.png', client_url: 'http://ad.poncan.jp/click/campaign/6a433eb5d3c0045398aaefb094d20f31641189bb/c2a4e3d058790b2d4bf321a612ae360b076a6519', already_button_text: nil)

campaign_face_A  = CampaignFace.create(campaign_id: campaign_A.mid, face: 'SP', css: '/css/sp/themes/plus1g/style.css', title: 'CMを見てアンケートに答えてポイントをGET!', description: '')
campaign_face_B  = CampaignFace.create(campaign_id: campaign_B.mid, face: 'SP', css: '/css/sp/themes/plus1g/style.css', title: 'CMを見てアンケートに答えてポイントをGET!', description: '')

movie_A_m3u8 = Movie.create(campaign_id: campaign_A.mid, mime_type: 'application/x-mpegURL', src: 'http://video.poncan.jp/video/plus1g/movie.m3u8', duration: 47)
movie_A_flv  = Movie.create(campaign_id: campaign_A.mid, mime_type: 'video/x-flv', src: 'http://video.poncan.jp/video/plus1g/movie.flv', duration: 47)
movie_A_mp4  = Movie.create(campaign_id: campaign_A.mid, mime_type: 'video/mp4', src: 'http://video.poncan.jp/video/plus1g/movie.mp4', duration: 47)
movie_B_m3u8 = Movie.create(campaign_id: campaign_B.mid, mime_type: 'application/x-mpegURL', src: 'http://video.poncan.jp/video/plus1g/movie.m3u8', duration: 47)
movie_B_flv  = Movie.create(campaign_id: campaign_B.mid, mime_type: 'video/x-flv', src: 'http://video.poncan.jp/video/plus1g/movie.flv', duration: 47)
movie_B_mp4  = Movie.create(campaign_id: campaign_B.mid, mime_type: 'video/mp4', src: 'http://video.poncan.jp/video/plus1g/movie.mp4', duration: 47)

enq_face_A  = EnqFace.create(enq_id: enq_A.uuid, face: 'SP')
enq_face_B  = EnqFace.create(enq_id: enq_B.uuid, face: 'SP')

q1 = Question.create(kind: 'radio', title: '性別を教えてください', required: true)
q2 = Question.create(kind: 'radio', title: '年齢をお答え下さい', required: true)
q3 = Question.create(kind: 'radio', title: 'もしオリジナルTシャツを作成するとしたらどのような場面ですか？', required: true)
q4 = Question.create(kind: 'radio', title: 'オリジナルTシャツの制作で重視するところはどこですか？', required: true)
q5 = Question.create(kind: 'radio', title: '『プラスワン』のCMを見て良いと思ったところはどこですか？', required: true)
q6 = Question.create(kind: 'radio', title: '【クイズ】CMの中で『プラスワン』の顧客満足度は何％でしたか？', required: true, answer_content: '92%')
q7 = Question.create(kind: 'radio', title: '『プラスワン』というサービスを知っていましたか？', required: true)
q8 = Question.create(kind: 'radio', title: 'CMを見てサービスに興味を持ちましたか？', required: true)
q9 = Question.create(kind: 'radio', title: 'CMを見てサービスを利用したいと思いましたか？', required: true)
q10 = Question.create(kind: 'radio', title: '今回なぜCMを見ていただけましたか？', required: true)

q1_c1 = Choice.create(question_id: q1.uuid, order: 1, content: '男性')
q1_c2 = Choice.create(question_id: q1.uuid, order: 2, content: '女性')

q2_c1 = Choice.create(question_id: q2.uuid, order: 1, content: '19歳以下')
q2_c2 = Choice.create(question_id: q2.uuid, order: 2, content: '20~29歳')
q2_c3 = Choice.create(question_id: q2.uuid, order: 3, content: '30~39歳')
q2_c4 = Choice.create(question_id: q2.uuid, order: 4, content: '40~49歳')
q2_c5 = Choice.create(question_id: q2.uuid, order: 5, content: '50歳以上')

q3_c1 = Choice.create(question_id: q3.uuid, order: 1, content: 'サークル等の仲間内で利用')
q3_c2 = Choice.create(question_id: q3.uuid, order: 2, content: 'スポーツチームで利用')
q3_c3 = Choice.create(question_id: q3.uuid, order: 3, content: '勤務している企業/お店で利用')
q3_c4 = Choice.create(question_id: q3.uuid, order: 4, content: '家族・友達で利用')
q3_c5 = Choice.create(question_id: q3.uuid, order: 5, content: 'プレゼントとして利用')

q4_c1 = Choice.create(question_id: q4.uuid, order: 1, content: 'デザイン')
q4_c2 = Choice.create(question_id: q4.uuid, order: 2, content: '着心地')
q4_c3 = Choice.create(question_id: q4.uuid, order: 3, content: '耐久性')
q4_c4 = Choice.create(question_id: q4.uuid, order: 4, content: '価格')
q4_c5 = Choice.create(question_id: q4.uuid, order: 5, content: '制作スピード')

q5_c1 = Choice.create(question_id: q5.uuid, order: 1, content: 'デザインを自由に選べる')
q5_c2 = Choice.create(question_id: q5.uuid, order: 2, content: 'ウェブから簡単に発注できる')
q5_c3 = Choice.create(question_id: q5.uuid, order: 3, content: '顧客満足度が高い')
q5_c4 = Choice.create(question_id: q5.uuid, order: 4, content: '見積もりが簡単にできる')
q5_c5 = Choice.create(question_id: q5.uuid, order: 5, content: '販売実績が年間150万枚と豊富')

q6_c1 = Choice.create(question_id: q6.uuid, order: 1, content: '92%')
q6_c2 = Choice.create(question_id: q6.uuid, order: 2, content: '83%')
q6_c3 = Choice.create(question_id: q6.uuid, order: 3, content: '71%')
q6_c4 = Choice.create(question_id: q6.uuid, order: 4, content: '64%')
q6_c5 = Choice.create(question_id: q6.uuid, order: 5, content: '50%')

q7_c1 = Choice.create(question_id: q7.uuid, order: 1, content: '知っており、自分で利用したことがある。')
q7_c2 = Choice.create(question_id: q7.uuid, order: 2, content: '知っており、知人が利用していたことがある。')
q7_c3 = Choice.create(question_id: q7.uuid, order: 3, content: '知っていたが、利用したことはない。')
q7_c4 = Choice.create(question_id: q7.uuid, order: 4, content: '知らなかった。')

q8_c1 = Choice.create(question_id: q8.uuid, order: 1, content: '非常に興味を持った')
q8_c2 = Choice.create(question_id: q8.uuid, order: 2, content: '少し興味を持った')
q8_c3 = Choice.create(question_id: q8.uuid, order: 3, content: 'あまり興味を持たなかった')
q8_c4 = Choice.create(question_id: q8.uuid, order: 4, content: '全く興味を持たなかった')

q9_c1 = Choice.create(question_id: q9.uuid, order: 1, content: '是非利用したいと思う')
q9_c2 = Choice.create(question_id: q9.uuid, order: 2, content: '機会があれば利用したいと思う')
q9_c3 = Choice.create(question_id: q9.uuid, order: 3, content: '利用したいと思わない')

q10_c1 = Choice.create(question_id: q10.uuid, order: 1, content: 'サービスが魅力的だったから')
q10_c2 = Choice.create(question_id: q10.uuid, order: 2, content: 'ポイントが魅力的だったから')
q10_c3 = Choice.create(question_id: q10.uuid, order: 3, content: 'どちらも魅力的だったから')

enq_A_page10 = EnqPage.create(enq_face_id: enq_face_A.uuid)
enq_A_page9 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page10.uuid)
enq_A_page8 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page9.uuid)
enq_A_page7 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page8.uuid)
enq_A_page6 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page7.uuid)
enq_A_page5 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page6.uuid)
enq_A_page4 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page5.uuid)
enq_A_page3 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page4.uuid)
enq_A_page2 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page3.uuid)
enq_A_page1 = EnqPage.create(enq_face_id: enq_face_A.uuid, next_page_id: enq_A_page2.uuid)
enq_face_A.first_page_id = enq_A_page1.uuid
enq_face_A.save

enq_B_page10 = EnqPage.create(enq_face_id: enq_face_B.uuid)
enq_B_page9 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page10.uuid)
enq_B_page8 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page9.uuid)
enq_B_page7 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page8.uuid)
enq_B_page6 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page7.uuid)
enq_B_page5 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page6.uuid)
enq_B_page4 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page5.uuid)
enq_B_page3 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page4.uuid)
enq_B_page2 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page3.uuid)
enq_B_page1 = EnqPage.create(enq_face_id: enq_face_B.uuid, next_page_id: enq_B_page2.uuid)
enq_face_B.first_page_id = enq_B_page1.uuid
enq_face_B.save

enq_A_q1 = EnqQuestion.create(enq_page_id: enq_A_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_A_q2 = EnqQuestion.create(enq_page_id: enq_A_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_A_q3 = EnqQuestion.create(enq_page_id: enq_A_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_A_q4 = EnqQuestion.create(enq_page_id: enq_A_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_A_q5 = EnqQuestion.create(enq_page_id: enq_A_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_A_q6 = EnqQuestion.create(enq_page_id: enq_A_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)
enq_A_q7 = EnqQuestion.create(enq_page_id: enq_A_page7.uuid, num: 7, seq: 'Q7', question_id: q7.uuid)
enq_A_q8 = EnqQuestion.create(enq_page_id: enq_A_page8.uuid, num: 8, seq: 'Q8', question_id: q8.uuid)
enq_A_q9 = EnqQuestion.create(enq_page_id: enq_A_page9.uuid, num: 9, seq: 'Q9', question_id: q9.uuid)
enq_A_q10 = EnqQuestion.create(enq_page_id: enq_A_page10.uuid, num: 10, seq: 'Q10', question_id: q10.uuid)

enq_B_q1 = EnqQuestion.create(enq_page_id: enq_B_page1.uuid, num: 1, seq: 'Q1', question_id: q1.uuid)
enq_B_q2 = EnqQuestion.create(enq_page_id: enq_B_page2.uuid, num: 2, seq: 'Q2', question_id: q2.uuid)
enq_B_q3 = EnqQuestion.create(enq_page_id: enq_B_page3.uuid, num: 3, seq: 'Q3', question_id: q3.uuid)
enq_B_q4 = EnqQuestion.create(enq_page_id: enq_B_page4.uuid, num: 4, seq: 'Q4', question_id: q4.uuid)
enq_B_q5 = EnqQuestion.create(enq_page_id: enq_B_page5.uuid, num: 5, seq: 'Q5', question_id: q5.uuid)
enq_B_q6 = EnqQuestion.create(enq_page_id: enq_B_page6.uuid, num: 6, seq: 'Q6', question_id: q6.uuid)
enq_B_q7 = EnqQuestion.create(enq_page_id: enq_B_page7.uuid, num: 7, seq: 'Q7', question_id: q7.uuid)
enq_B_q8 = EnqQuestion.create(enq_page_id: enq_B_page8.uuid, num: 8, seq: 'Q8', question_id: q8.uuid)
enq_B_q9 = EnqQuestion.create(enq_page_id: enq_B_page9.uuid, num: 9, seq: 'Q9', question_id: q9.uuid)
enq_B_q10 = EnqQuestion.create(enq_page_id: enq_B_page10.uuid, num: 10, seq: 'Q10', question_id: q10.uuid)

