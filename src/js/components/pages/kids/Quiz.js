import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import AppLogo from '../../../components/common/AppLogo';
import Button from '../../../components/common/Button';

import * as asyncActions from '../../../actions/async';
import * as pageActions from '../../../actions/page';


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
		title: 'Кто проработал в офисе все выходные?',
		answers: [
			'Санька',
			'Савятка',
			'Другой Санька, который плохой',
		],
		correct: 'Санька',
	},
];

class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			correctAnswers: 0,
			startTime: 0,
			time: 0,
			showResults: false,
			currentQuestion: 1,
		};

	}

	componentWillMount(){
		const { props } = this;

		if (!props.profile){
			props.redirect('/');
			return false;
		}
	}

	componentWillUnmount(){
		this._stopTimer();
	}

	componentDidMount(){
		this._startTimer();
	}

	_startTimer(){

		this.setState({
			...this.state,
			...{
				startTime: new Date().getTime(),
			}
		});

		this.timer = setInterval(this._timer.bind(this), 50);
	}

	_stopTimer(){
		clearInterval(this.timer);
	}

	_timer(){
		this.setState({
			...this.state,
			...{
				time: new Date().getTime() - this.state.startTime,
			}
		});
	}

	_getTime(milliseconds){
		const mseconds =(milliseconds%1000).toFixed(2);
		const seconds = ((milliseconds/1000)%60).toFixed(1);
		const minutes = Math.round((seconds/(1000*60))%60);

		return minutes + ':' + seconds;
	}

	_nextQuestion(){
		const { props, state } = this;

		if (state.currentQuestion === questions.length){
			//props.getResults(state.answers);

			this._stopTimer();
			this.setState({
				...this.state,
				...{
					showResults: true,
				}
			});

		}else{
			this.setState({
				...this.state,
				...{
					currentQuestion: this.state.currentQuestion + 1,
				}
			});
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

	_goBackHandler = () => (e) => {
		e.preventDefault();
		this.props.goTo('/kids');
	}


	_question(questionIndex, question){
		const { props, state } = this;

		return(
			<div
				className={(
					'quiz__item '
					+ ( state.currentQuestion === questionIndex ? 'quiz__item--visible' : '')
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

						{question.answers.map( (answer, i) => (
							<li className="quiz-item__answer" key={questionIndex + i}>

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
		const { props, state } = this;


		return(
			<div className="app__page quiz">

				<AppLogo 
					mixClass="app__logo"
					href="/kids"
				/>

				<div className="app__counters counters">

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
										{this._getTime(state.time)}
									</span>
								</div>

							</div>

						</li>

					</ul>

				</div>

				<div className="quiz__content">

					{
						state.showResults
						?
						(
							<div className="quiz__results quiz-results">

								<div className="quiz-results__title">
									Результаты:
								</div>

								<ul className="quiz-results__list">

									<li className="quiz-results__item">

										Правильных ответов: {state.correctAnswers}

									</li>

									<li className="quiz-results__item">

										Время: {this._getTime(state.time)}

									</li>

								</ul>	

								<div className="quiz-results__button-placeholder">						

									<Button
										mixClass="quiz-results__button"
										size="m"
										color="orange"
										type="button"
										onClickHandler={this._goBackHandler()}
									>
										<span className="button__text">Назад к активностям</span>
									</Button>

								</div>	

							</div>
						)
						:
						(
						<div className="quiz__questions">

							{questions.map( (question, index) => (
								this._question(index + 1, question)
							))}

						</div>
						)
					}

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
	getResults: (data) => dispatch(asyncActions.getResults(data)),
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)),
	goTo: (page) => dispatch(pageActions.setPage(page)),
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
