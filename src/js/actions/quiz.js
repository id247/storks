
export const QUIZ_SET_CURRENT_QUESTION		= 'QUIZ_SET_CURRENT_QUESTION';



export function quizSetCurrentQuestion(questionId) {
	return {
		type: QUIZ_SET_CURRENT_QUESTION,
		payload: questionId,
	}
};

