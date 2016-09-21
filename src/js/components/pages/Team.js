import React from 'react';
import { connect } from 'react-redux';

import AppLogo from '../../components/common/AppLogo';
import Button from '../../components/common/Button';
import User from '../../components/user/User';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class Team extends React.Component {

	componentWillMount(){
		const { props } = this;
		// if (props.profile){
		// 	props.redirect('/');
		// }
	}

	_selectTeam(team){
		const { props } = this;
		if (!props.profile){
			props.login('/' + team);
			return;
		}

		props.goTo('/' + team);
	}

	_selectTeamHandler = (team) => (e) => {
		e.preventDefault();
		this._selectTeam(team);
	}

	render(){
		const { props } = this;

		return (
			<div className="app__page team">

				<AppLogo 
					mixClass="app__logo"
					href="/"
				/>

				<div className="team__content">

					<div className="team__activities team-activities">

						<ul className="team-activities__list">

							<li className="team-activities__item">

								<button className="team-activities__button team-activities__button--1">
									Проходи<br/>
									испытания
								</button>

							</li>


							<li className="team-activities__item">

								<button className="team-activities__button team-activities__button--2">
									Зарабатывай<br/>
									баллы
								</button>

							</li>


							<li className="team-activities__item">

								<button className="team-activities__button team-activities__button--3">
									Получай<br/>
									призы
								</button>

							</li>

						</ul>


					</div>

					<div className="team__team-select team-select">

						<div className="team-select__title">
							Выбери свою команду
						</div>

						<div className="team-select__buttons">

							<div className="team-select__button-placeholder">

								<Button
									mixClass="team-select__button"
									size="m"
									color="orange"
									type="button"
									onClickHandler={this._selectTeamHandler('parents')}
								>
									<span className="button__text">Родители</span>
								</Button>

							</div>

							<div className="team-select__button-placeholder">

								<Button
									mixClass="team-select__button"
									size="m"
									color="orange"
									type="button"
									onClickHandler={this._selectTeamHandler('kids')}
								>
									<span className="button__text">Дети</span>
								</Button>

							</div>

						</div>

					</div>

					{
						props.profile
						?
						<User mixClass="team__user" />
						: null
					}

				</div>

			</div>
		);
	}
}

Team.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	login: (pageAfterLogin) => dispatch(asyncActions.login(pageAfterLogin)),
	init: () => dispatch(asyncActions.init()),
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)),
	goTo: (page) => dispatch(pageActions.setPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
