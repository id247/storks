import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import * as quizActions from '../../actions/quiz';
import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';


const questions = [
	{
		title: 'Как зовут лучшего аиста в курьерской службе?',
		answers: [
			'Джуниор',
			'Джери',
			'Джаред',
		],
		correct: 'Джуниор',
	},
	{
		title: 'Как зовут лучшего аиста в курьерской службе? 2',
		answers: [
			'Джуниор',
			'Джери',
			'Джаред',
		],
		correct: 'Джуниор',
	},
];

class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			correctAnswers: 0,
		};
	}

	componentWillMount(){
		const { props } = this;	
	}

	componentDidMount(){
		const { props } = this;		
	}

	_nextQuestion(){
		const { props, state } = this;

		if (props.quiz.currentQuestion === questions.length){
			//props.getResults(state.answers);
			
			console.log('result is ' + this.state.correctAnswers );
		}else{
			props.quizSetCurrentQuestion( props.quiz.currentQuestion + 1 );
		}		
	}

	_correctAnswer(){
		
		this.setState({
			...this.state,
			...{
				correctAnswers: this.state.correctAnswers + 1,
			}
		});

		console.log(this.state);		
	}

	_selectAnswerHandler = (questionIndex, answer) => (e) => {
		e.preventDefault();

		if (questions[questionIndex - 1].correct === answer){
			console.log('correct');
			this._correctAnswer();
		}

		setTimeout(() => { //hack for update state twice
		 	this._nextQuestion();	
		}, 0);
		
	}

	_image(questionIndex){
		return(

			<div className="quiz__image-placeholder">

				<img src={(PromoOptions.cdn + 'images/quiz/' + questionIndex + '.png')} alt="" className="quiz__image"/>

			</div>

		);
	}


	_question(questionIndex, question){
		const { props } = this;

		return(
			<div 
				className={(
					'quiz__item ' 
					+ ( props.quiz.currentQuestion === questionIndex ? 'quiz__item--visible' : '') 
					+ ' quiz-item'
					)}
				key={questionIndex}
				>

					<div className="quiz-item__number">
						Вопрос {questionIndex}/{questions.length}
					</div>

					<h3 className="quiz-item__title">
						{question.title}
					</h3>

					<ul className="quiz-item__answers">

						{question.answers.map( answer => (
							<li className="quiz-item__answer">

								<button 
									className="quiz-item__button"
									onClick={this._selectAnswerHandler(questionIndex, answer)}
								>
									{answer}
								</button>

							</li>
						))}

					</ul>

			</div>
		);
	}


	render(){
		const { props } = this;


		return(
			<div className="app__page quiz">

				<div className="quiz__logo storks-logo">
					Аисты
				</div>

				<div className="quiz__counters counters">

					<ul className="counters__list">

						<li className="counters__item">

							<div className="counters__content">

								<div className="counters__title">
									<span className="counters__text">
										МОЕ ВРЕМЯ
									</span>
								</div>

								<div className="counters__data">
									<span className="counters__text">
										01:33
									</span>
								</div>

							</div>

						</li>

					</ul>

				</div>

				<div className="quiz__content">

					<div className="quiz__questions">

						{questions.map( (question, index) => (
							this._question(index + 1, question)
						))}

					</div>

				</div>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
	quiz: state.quiz,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	quizSetCurrentQuestion: (questionId) => dispatch(quizActions.quizSetCurrentQuestion(questionId)), 
	getResults: (data) => dispatch(asyncActions.getResults(data)), 
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)), 
});

Quiz.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
