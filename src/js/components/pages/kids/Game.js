import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import Button from '../../../components/common/Button';
import AppLogo from '../../../components/common/AppLogo';

import * as asyncActions from '../../../actions/async';
import * as pageActions from '../../../actions/page';


const answers = {
	left: [
		{
			id: 'left-1',
			style:{
				top: '2%',
				right: '23%',
				width: '18%',
				height: '28%',
			},
		},
		{
			id: 'left-2',
			style:{
				top: '10%',
				right: '42%',
				width: '11%',
				height: '23%',
			},
		},
	],
	right: [
		{
			id: 'right-1',
			style:{
				top: '0%',
				left: '5%',
				width: '25%',
				height: '23%',
			},
		},
		{
			id: 'right-2',
			style:{
				top: '12%',
				left: '32%',
				width: '25%',
				height: '20%',
			},
		},
	],
};

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			correctAnswers: 0,
			founded: [],
			startTime: 0,
			time: 0,
			showResults: false,
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

	_correctAnswer(id){

		const { props, state } = this;

		this.setState({
			...this.state,
			...{
				correctAnswers: this.state.correctAnswers + 1,
				founded: [...this.state.founded, id],
			}
		});

		setTimeout(this._getResults.bind(this), 0);

	}

	_getResults(){
		const { props, state } = this;

		if (state.correctAnswers < answers.left.length + answers.right.length){
			return false;
		}
		
		this._stopTimer();
		this.setState({
			...this.state,
			...{
				showResults: true,
			}
		});
	}

	_selectAnswerHandler = (id) => (e) => {
		e.preventDefault();
		this._correctAnswer(id);
	}

	_goBackHandler = () => (e) => {
		e.preventDefault();
		this.props.goTo('/kids');
	}


	render(){
		const { props, state } = this;

		//console.log(state.founded);

		return(
			<div className="app__page game">

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
										ПРАВИЛЬНЫЕ ОТВЕТЫ
									</span>
								</div>

								<div className="counters__data">
									<span className="counters__text">
										{state.correctAnswers}
									</span>
								</div>

							</div>

						</li>

						<li className="counters__item">

							<div className="counters__content">

								<div className="counters__title">
									<span className="counters__text">
										ВРЕМЯ
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

				<div className="game__content">

					{
						state.showResults
						?
						(
							<div className="game__results game-results">

								<div className="game-results__title">
									Результаты:
								</div>

								<ul className="game-results__list">

									<li className="game-results__item">

										Правильных ответов: {state.correctAnswers}

									</li>

									<li className="game-results__item">

										Время: {this._getTime(state.time)}

									</li>

								</ul>	

								<div className="game-results__button-placeholder">						

									<Button
										mixClass="game-results__button"
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
						<div className="game__images game-images">

							<h3 className="game-images__title">
								НАЙДИ 10 ОТЛИЧИЙ
							</h3>

							<div className="game-images__list">
								
								<div className="game-images__item">

									<div className="game-image">

										<img src={(PromoOptions.cdn + 'images/game/1-1.jpg')} alt="" />

										{answers.left
											.filter( answer => state.founded.indexOf(answer.id) === -1)
											.map( (answer, i) => (
											<button 
												style={answer.style}
												key={answer.id}
												className="game-image__button"
												onClick={this._selectAnswerHandler(answer.id)}
											>
											</button>
										))}

									</div>

								</div>

									
								<div className="game-images__item">

									<div className="game-image">

										<img src={(PromoOptions.cdn + 'images/game/1-2.jpg')} alt="" />
										
										{answers.right
											.filter( answer => state.founded.indexOf(answer.id) === -1)
											.map( (answer, i) => (
											<button 
												style={answer.style}
												key={answer.id}
												className="game-image__button"
												onClick={this._selectAnswerHandler(answer.id)}
											>
											</button>
										))}

									</div>

								</div>

							</div>

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
	game: state.game,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getResults: (data) => dispatch(asyncActions.getResults(data)),
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)),
	goTo: (page) => dispatch(pageActions.setPage(page)),
});

Game.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
