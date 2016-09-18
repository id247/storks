import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class Team extends React.Component {

	componentWillMount(){
		const { props } = this;
		// if (props.profile){
		// 	props.redirect('/');
		// }
	}

	render(){
		const { props } = this;

		return (
			<div className="app__page team">

				<div className="team__logo storks-logo">
					Аисты
				</div>

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
									onClickHandler={props.login}
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
									onClickHandler={props.login}
								>
									<span className="button__text">Дети</span>
								</Button>

							</div>

						</div>

					</div>

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
	login: () => dispatch(asyncActions.login()),
	init: () => dispatch(asyncActions.init()),
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
