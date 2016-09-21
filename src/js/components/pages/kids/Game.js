import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import { parseTime } from '../../../helpers/time';

import Button from '../../../components/common/Button';
import Link from '../../../components/common/Link';
import AppLogo from '../../../components/common/AppLogo';

import * as asyncActions from '../../../actions/async';
import * as pageActions from '../../../actions/page';


const paths = {
	left: [
		{
			id: 'hair',
			path: 'M73.000,330.000 L95.000,297.000 L118.000,277.000 L141.000,270.000 L158.000,277.000 L169.000,290.000 L182.000,299.000 L197.000,302.000 L216.000,303.000 L223.000,313.000 L224.000,331.000 L223.000,362.000 L216.000,385.000 L214.000,396.000 L223.000,396.000 L233.000,368.000 L241.000,342.000 L241.000,319.000 L233.000,297.000 L219.000,281.000 L199.000,262.000 L178.000,257.000 L158.000,251.000 L133.000,251.000 L117.000,257.000 L98.000,271.000 L82.000,296.000 L73.000,319.000 L73.000,330.000 Z',
		},
		{
			id: 'stork-mother',
			path: 'M239.000,178.000 L242.000,130.000 L242.000,110.000 L243.000,92.000 L254.000,83.000 L265.000,77.000 L272.000,77.000 L286.000,85.000 L292.000,95.000 L292.000,122.000 L293.000,142.000 L296.000,188.000 L273.000,187.000 L263.000,204.000 L256.000,189.000 L239.000,178.000 Z',
		},
		{
			id: 'stork-mother',
			path: 'M349.000,39.000 L370.000,53.000 L379.000,63.000 L381.000,79.000 L377.000,95.000 L371.000,110.000 L365.000,123.000 L358.000,136.000 L349.000,146.000 L349.000,152.000 L360.000,163.000 L366.000,173.000 L366.000,182.000 L345.000,177.000 L332.000,182.000 L328.000,190.000 L307.000,179.000 L309.000,161.000 L317.000,147.000 L327.000,142.000 L315.000,134.000 L309.000,117.000 L300.000,103.000 L294.000,86.000 L291.000,71.000 L301.000,51.000 L323.000,37.000 L349.000,39.000 Z',
		},
		{
			id: 'letter',
			path: 'M312.000,429.000 L314.000,484.000 L371.000,487.000 L375.000,430.000 L312.000,429.000 Z',
		},
		{
			id: 'green-bird',
			path: 'M347.000,347.000 L340.000,326.000 L337.000,307.000 L332.000,294.000 L329.000,283.000 L330.000,268.000 L339.000,260.000 L349.000,260.000 L356.000,256.000 L372.000,253.000 L381.000,256.000 L390.000,266.000 L395.000,278.000 L394.000,287.000 L389.000,295.000 L387.000,309.000 L380.000,324.000 L378.000,338.000 L378.000,353.000 L347.000,347.000 Z',
		},
		{
			id: 'yes',
			path: 'M132.000,326.000 L112.000,318.000 L99.000,321.000 L91.000,329.000 L91.000,343.000 L97.000,359.000 L110.000,364.000 L127.000,364.000 L137.000,347.000 L132.000,326.000 Z',
		},
		{
			id: 'yes',
			path: 'M169.000,356.000 L185.000,351.000 L199.000,358.000 L207.000,368.000 L209.000,381.000 L204.000,394.000 L194.000,400.000 L179.000,399.000 L161.000,387.000 L159.000,370.000 L169.000,356.000 Z',
		},
		{
			id: 'china',
			path: 'M363.000,376.000 L361.000,387.000 L362.000,408.000 L370.000,420.000 L386.000,424.000 L410.000,419.000 L418.000,399.000 L416.000,374.000 L400.000,360.000 L375.000,358.000 L363.000,376.000 Z',
		},
	],
	right: [
		{
			id: 'hair',
			path: 'M73.000,330.000 L95.000,297.000 L118.000,277.000 L141.000,270.000 L158.000,277.000 L169.000,290.000 L182.000,299.000 L197.000,302.000 L216.000,303.000 L223.000,313.000 L224.000,331.000 L223.000,362.000 L216.000,385.000 L214.000,396.000 L223.000,396.000 L233.000,368.000 L241.000,342.000 L241.000,319.000 L233.000,297.000 L219.000,281.000 L199.000,262.000 L178.000,257.000 L158.000,251.000 L133.000,251.000 L117.000,257.000 L98.000,271.000 L82.000,296.000 L73.000,319.000 L73.000,330.000 Z',
		},
		{
			id: 'parents',
			path: 'M79.000,33.000 L95.000,37.000 L104.000,37.000 L112.000,28.000 L122.000,25.000 L132.000,29.000 L138.000,36.000 L140.000,47.000 L138.000,61.000 L131.000,73.000 L130.000,81.000 L144.000,90.000 L152.000,103.000 L157.000,119.000 L162.000,129.000 L161.000,138.000 L142.000,152.000 L132.000,159.000 L136.000,142.000 L135.000,129.000 L122.000,117.000 L111.000,114.000 L98.000,126.000 L97.000,143.000 L92.000,153.000 L78.000,148.000 L73.000,133.000 L63.000,123.000 L50.000,126.000 L40.000,120.000 L39.000,110.000 L45.000,107.000 L55.000,108.000 L61.000,114.000 L61.000,90.000 L68.000,82.000 L60.000,74.000 L56.000,55.000 L55.000,40.000 L70.000,32.000 L79.000,33.000 Z',
		},
		{
			id: 'wolf-1',
			path: 'M224.000,104.000 L237.000,106.000 L253.000,109.000 L263.000,119.000 L277.000,132.000 L288.000,140.000 L288.000,152.000 L285.000,162.000 L278.000,177.000 L275.000,186.000 L265.000,197.000 L248.000,178.000 L231.000,178.000 L217.000,178.000 L209.000,178.000 L201.000,173.000 L192.000,162.000 L185.000,161.000 L172.000,162.000 L164.000,165.000 L164.000,152.000 L179.000,136.000 L182.000,125.000 L185.000,114.000 L196.000,106.000 L214.000,105.000 L224.000,104.000 Z',
		},
		{
			id: 'wolf-2',
			path: 'M370.000,186.000 L349.000,167.000 L337.000,142.000 L336.000,123.000 L342.000,108.000 L355.000,93.000 L362.000,74.000 L375.000,87.000 L381.000,69.000 L396.000,87.000 L416.000,88.000 L431.000,96.000 L438.000,116.000 L435.000,129.000 L432.000,138.000 L370.000,186.000 Z',
		},
		{
			id: 'boy',
			path: 'M498.000,373.000 L487.000,360.000 L476.000,362.000 L473.000,338.000 L472.000,312.000 L472.000,299.000 L468.000,291.000 L446.000,291.000 L436.000,289.000 L430.000,284.000 L423.000,290.000 L412.000,290.000 L401.000,275.000 L398.000,265.000 L403.000,257.000 L392.000,253.000 L384.000,249.000 L374.000,230.000 L370.000,213.000 L370.000,196.000 L377.000,185.000 L388.000,170.000 L408.000,154.000 L423.000,144.000 L445.000,133.000 L462.000,137.000 L481.000,148.000 L492.000,161.000 L501.000,180.000 L498.000,373.000 Z',
		},
		{
			id: 'green-bird',
			path: 'M347.000,347.000 L340.000,326.000 L337.000,307.000 L332.000,294.000 L329.000,283.000 L330.000,268.000 L339.000,260.000 L349.000,260.000 L356.000,256.000 L372.000,253.000 L381.000,256.000 L390.000,266.000 L395.000,278.000 L394.000,287.000 L389.000,295.000 L387.000,309.000 L380.000,324.000 L378.000,338.000 L378.000,353.000 L347.000,347.000 Z',
		},
		{
			id: 'yes',
			path: 'M132.000,326.000 L112.000,318.000 L99.000,321.000 L91.000,329.000 L91.000,343.000 L97.000,359.000 L110.000,364.000 L127.000,364.000 L137.000,347.000 L132.000,326.000 Z',
		},
		{
			id: 'yes',
			path: 'M169.000,356.000 L185.000,351.000 L199.000,358.000 L207.000,368.000 L209.000,381.000 L204.000,394.000 L194.000,400.000 L179.000,399.000 L161.000,387.000 L159.000,370.000 L169.000,356.000 Z',
		},
		{
			id: 'china',
			path: 'M363.000,376.000 L361.000,387.000 L362.000,408.000 L370.000,420.000 L386.000,424.000 L410.000,419.000 L418.000,399.000 L416.000,374.000 L400.000,360.000 L375.000,358.000 L363.000,376.000 Z',
		},
	],
}

											
											
											
											
											
											


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
				startTime: new Date().getTime(),//- 60*2000,
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

		if (state.correctAnswers < 10){
			return false;
		}
		
		this._stopTimer();
		this.setState({
			...this.state,
			...{
				showResults: true,
			}
		});

		props.setGameData({
			points: state.correctAnswers,
			time: state.time,
		});
	}

	_getTime(ms){
		return parseTime(ms);
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

					<div className="app__back-placeholder">

						<Link href="/kids" mixClass="app__back">
							НА ГЛАВНУЮ
						</Link>

					</div>

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

										Время: {this._getTime(state.time)}

									</li>

									<li className="game-results__item">

										Заработано 10 очков

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
								НАЙДИ ОТЛИЧИЯ
							</h3>

							<div className="game-images__counter">
								Найдено {state.correctAnswers} из 10								
							</div>

							<div className="game-images__list">
								
								<div className="game-images__item">

									<div className="game-image">

										<img src={(PromoOptions.cdn + 'images/game/1-1.jpg')} className="game-image__image" alt="" />

										<svg 
											className="game-image__svg"
											xmlns="http://www.w3.org/2000/svg" 
											xmlnsXlink="http://www.w3.org/1999/xlink" 
											preserveAspectRatio="xMidYMid" 
											width="500" 
											height="500" 
											viewBox="0 0 500 500"
										>

										{paths.left
											.filter( path => state.founded.indexOf(path.id) === -1)
											.map( (path, i) => (
										
											<path 
												key={'left-' + path.id + i}
												onClick={this._selectAnswerHandler(path.id)}
												d={path.path}
											/>

										))}

										</svg>


									</div>

								</div>

									
								<div className="game-images__item">

									<div className="game-image">

										<img src={(PromoOptions.cdn + 'images/game/1-2.jpg')} className="game-image__image" alt="" />

										<svg 
											className="game-image__svg"
											xmlns="http://www.w3.org/2000/svg" 
											xmlnsXlink="http://www.w3.org/1999/xlink" 
											preserveAspectRatio="xMidYMid" 
											width="500" 
											height="500" 
											viewBox="0 0 500 500"
										>

										{paths.right
											.filter( path => state.founded.indexOf(path.id) === -1)
											.map( (path, i) => (
										
											<path 
												key={'right-' + path.id + i}
												onClick={this._selectAnswerHandler(path.id)}
												d={path.path}
											/>

										))}

										</svg>

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
	setGameData: (data) => dispatch(asyncActions.setGameData(data)),
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
