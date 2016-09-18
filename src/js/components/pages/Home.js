import React from 'react';
import { connect } from 'react-redux';

//import User from '../../components/user/User';

//import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class Home extends React.Component {

	_selectActivityHandler = (activity) => (e) => {
		e.preventDefault();

		this.props.setPage('/' + activity);
	}

	render(){
		const { props } = this;
		return(
			<div className="app__page home">

				<div className="home__counters counters">

					<ul className="counters__list">

						<li className="counters__item">

							<div className="counters__content">

								<div className="counters__title">
									<span className="counters__text">
										МОИ БАЛЛЫ
									</span>
								</div>

								<div className="counters__data">
									<span className="counters__text">
										100
									</span>
								</div>

							</div>

						</li>

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

				<div className="home__content">

					<div className="home__logo-placeholder">

						<span className="home__logo">Аисты</span>

					</div>

					<h1 className="home__title">
						ЗАРАБАТЫВАЙ БАЛЛЫ И ПОЛУЧАЙ ПРИЗЫ
					</h1>

					<div className="home__activities home-activities">

						<ul className="home-activities__list">

							<li className="home-activities__item">

								<button 
									className="home-activities__button home-activities__button--1"
									onClick={this._selectActivityHandler('quiz')}
								>
									Тест на знание мультика
								</button>

							</li>

							<li className="home-activities__item">

								<button 
									className="home-activities__button home-activities__button--2"
									onClick={this._selectActivityHandler('game')}
									
								>
									Игра найди 10 отличий
								</button>

							</li>

							<li className="home-activities__item">

								<button 
									className="home-activities__button home-activities__button--3"
									onClick={this._selectActivityHandler('stickest')}
								>
									Отправь стикер другу
								</button>

							</li>

						</ul>

					</div>

				</div>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	//profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setPage: (page) => dispatch(pageActions.setPage(page)),
});

Home.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
