# coding: utf-8

module CampaignsHelper

  def default_css(face)
    if face.face.upcase == "PC" 
      "/css/pc/themes/default/style.css"
    else
      "/css/sp/themes/default/style.css"
    end
  end

  def default_title
    ''
  end

  def default_description(face)
    if face.face.upcase == "PC" 
      '<p>動画を見ながらアンケートに答えてプレゼントをもらおう！</p><p>#{point}ポイントプレゼント</p>'
    else
      '<p>動画を見ながらアンケートに答えて#{point}ポイントもらおう</p>'
    end
  end

  def default_message
    '<p>アンケートは終了です。ありがとうございました。</p>'
  end

  def default_thanks_button_text
    'CMのサイトを見る'
  end

  def default_enq_message
    '<p>アンケートが完了しました。</p>'
  end

  def default_complete_button_text
    'ポイントをもらう'
  end

  def default_page_button_text
    'CMサイトへ'
  end

  def default_already_button_text
    'CMのサイトを見る'
  end

end
