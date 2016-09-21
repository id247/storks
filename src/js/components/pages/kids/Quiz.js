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
			{
				title: 'Джуниор',
				points: 5,
			},
			{
				title: 'Джери',
				points: 0,
			},
			{
				title: 'Джаред',
				points: 0,
			},
		],
		multi: false,
	},
	{
		title: 'Как зовут его подругу?',
		answers: [
			{
				title: 'Лютик',
				points: 5,
			},
			{
				title: 'Цветик',
				points: 0,
			},
			{
				title: 'Василек',
				points: 0,
			},
		],
		multi: false,
	},
	{
		title: 'Раньше аисты доставляли детей. По сюжету мультфильма они поменяли квалификацию и теперь доставляют именно это. Что?',
		answers: [
			{
				title: 'Счастье',
				points: 0,
			},
			{
				title: 'Цветы',
				points: 0,
			},
			{
				title: 'Посылки',
				points: 5,
			},
		],
		multi: false,
	},
	{
		title: 'Мальчик в трейлере просит своих родителей перенести дымоход в другое место. Для чего?',
		answers: [
			{
				title: 'Чтобы удобнее было сидеть на крыше',
				points: 0,
			},
			{
				title: 'Чтобы аист принес ему братика',
				points: 5,
			},
			{
				title: 'Чтобы Санта-Клаусу было проще попасть в дом на Рождество',
				points: 0,
			},
		],
		multi: false,
	},
	{
		title: 'Отметь животных, которых ты увидел в трейлере! Ответов здесь несколько, и ты можешь заработать баллы за каждый верный ответ.',
		answers: [
			{
				title: 'Волк',
				points: 3,
			},
			{
				title: 'Белый медведь',
				points: 3,
			},
			{
				title: 'Обезьяна',
				points: 3,
			},
			{
				title: 'Кошка',
				points: 0,
			},
			{
				title: 'Пингвин',
				points: 5,
			},
			{
				title: 'Заяц',
				points: 0,
			},
			{
				title: 'Аист',
				points: 0,
			},
			{
				title: 'Попугай',
				points: 0,
			},
		],
		multi: true,
	},
];

class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			correctAnswers: 0,
			points: 0,
			startTime: 0,
			time: 0,
			showResults: false,
			currentQuestion: 1,
			modalVisible: true,
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
		//this._startTimer();
	}

	_startTimer(){

		this.setState({
			...this.state,
			...{
				startTime: new Date().getTime(),
				modalVisible: false,
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

	_addAnswerPoints(points){

		this.setState({
			...this.state,
			...{
				correctAnswers: this.state.correctAnswers + 1,
				points: this.state.points + points,
			}
		});

		console.log(this.state);
	}

	_selectAnswerHandler = (questionIndex, points) => (e) => {
		e.preventDefault();

		this._addAnswerPoints(points);

		setTimeout(() => { //hack for update state twice
		 	this._nextQuestion();
		}, 0);

	}
	_selectMultiAnswerHandler = (questionIndex) => (e) => {
		e.preventDefault();

		const checkedAnswers = this.refs.answers.querySelectorAll('.quiz-checkbox__input:checked');

		const points = [...checkedAnswers].reduce( (prev, answer) => {
			return prev + parseInt(answer.value);
		}, 0);
		// if (questions[questionIndex - 1].correct === answer){
		// 	console.log('correct');
		this._addAnswerPoints(points);
		// }

		setTimeout(() => { //hack for update state twice
		 	this._nextQuestion();
		}, 0);

	}

	_goBackHandler = () => (e) => {
		e.preventDefault();
		this.props.goTo('/kids');
	}

	_startQuizHandler = () => (e) => {
		e.preventDefault();

		this._startTimer();
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

					<ul className="quiz-item__answers" ref="answers">

						{question.answers.map( (answer, i) => {

							if (question.multi){

								return (
								<li className="quiz-item__answer quiz-item__answer--multi" key={questionIndex + i}>

									<label className="quiz-checkbox">
										<input 
											type="checkbox"
											className="quiz-checkbox__input"
											name="last[]"
											
											value={answer.points}
											//onChange={this._selectAnswerHandler(questionIndex, answer.points)}
										/>
										<span className="quiz-checkbox__text">
											{answer.title}
										</span>
									</label>

								</li>
								);
							}

							return (
							<li className="quiz-item__answer" key={questionIndex + i}>

								<button
									className="quiz-item__answer-button"
									onClick={this._selectAnswerHandler(questionIndex, answer.points)}
								>
									{answer.title}
								</button>

							</li>
							);

						})}

					</ul>

					{
						!question.multi
						? null
						:
						(

						<div className="quiz-item__button-placeholder">						

							<Button
								mixClass="quiz-item__button"
								size="m"
								color="orange"
								type="button"
								onClickHandler={this._selectMultiAnswerHandler()}
							>
								<span className="button__text">Отправить</span>
							</Button>

						</div>	

						)

					}

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

					<div className="quiz__frame">

						<div className="quiz__frame-inner">

							<div className="quiz__frame-content">

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

												Получено очков: {state.points}

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
					
					</div>

				</div>


				<div className={('app__modal modal ' + (state.modalVisible ? 'modal--visible' : '') )}>

					<div className="modal__content">

						<div className="modal__title">

							Посмотри Трейлер и ответь<br/>
							на вопросы

						</div>

						<div className="modal__video-placeholder">

							<iframe 
								width="640" 
								height="360" 
								src={state.modalVisible ? 'https://www.youtube.com/embed/c5D1VdncWNw' : 'about:blank'} 
								allowFullScreen>
							</iframe>

						</div>

						<div className="modal__button-placeholder">						

							<Button
								mixClass="modal__button"
								size="m"
								color="orange"
								type="button"
								onClickHandler={this._startQuizHandler()}
							>
								<span className="button__text">Начать</span>
							</Button>

						</div>	

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
