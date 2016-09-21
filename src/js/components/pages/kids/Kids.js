import React from 'react';
import { connect } from 'react-redux';

//import User from '../../components/user/User';

//import * as asyncActions from '../../actions/async';
import * as pageActions from '../../../actions/page';

class Kids extends React.Component {

	_selectActivityHandler = (activity) => (e) => {
		e.preventDefault();

		this.props.setPage('/kids/' + activity);
	}

	render(){
		const { props } = this;
		return(
			<div className="app__page home-kids">

				<div className="app__counters home-kids__counters counters">

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

				<div className="home-kids__content">

					<div className="home-kids__logo-placeholder">

						<span className="home-kids__logo">Аисты</span>

					</div>

					<h1 className="home-kids__title">
						ЗАРАБАТЫВАЙ БАЛЛЫ И ПОЛУЧАЙ ПРИЗЫ
					</h1>

					<div className="home-kids__activities home-kids-activities">

						<ul className="home-kids-activities__list">

							<li className="home-kids-activities__item">

								<button 
									className="home-kids-activities__button home-kids-activities__button--1"
									onClick={this._selectActivityHandler('quiz')}
								>
									Тест на знание мультика
								</button>

							</li>

							<li className="home-kids-activities__item">

								<button 
									className="home-kids-activities__button home-kids-activities__button--2"
									onClick={this._selectActivityHandler('game')}
									
								>
									Игра найди 10 отличий
								</button>

							</li>

							<li className="home-kids-activities__item">

								<button 
									className="home-kids-activities__button home-kids-activities__button--3"
									onClick={this._selectActivityHandler('stickers')}
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

Kids.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kids);
