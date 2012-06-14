json.(@page, *extract_nil(@page, :uuid, :description, :next_page_id, :wait_until))
json.enq_id @page.enq_face.enq_id
json.question_cnt @page.enq_questions.size

json.questions do |json|
  json.array!(@page.enq_questions) do |json, enq_question|
    json.(enq_question, :num, :seq)
    json.(enq_question.question, :kind, :title, :required)

    json.choices do |json|
      json.array!(enq_question.question.choices) do |json, choice|
        json.(choice, :uuid, :content)
      end
    end

    json.branches do |json|
      json.array!(enq_question.branches) do |json, branch|
        json.(branch, *extract_nil(branch, :answer, :next_page_id, :wait_until))
      end
    end

    unless enq_question.question.answer_content.nil?
      json.answer do |json|
        json.content enq_question.question.answer_content
        json.description enq_question.question.answer_description unless enq_question.question.answer_description.nil?
      end
    end
  end
end


