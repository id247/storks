import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import { parseTime } from '../../../helpers/time';

import AppLogo from '../../../components/common/AppLogo';
import Link from '../../../components/common/Link';
import Button from '../../../components/common/Button';

import * as asyncActions from '../../../actions/async';
import * as pageActions from '../../../actions/page';

class Only extends React.Component {

	componentWillMount(){
		const { props } = this;

		props.getAllResults();
	}

	_sortTop(top){

		const keysWithUsers = top.keys.map( key => {
			let user = false;
			const usersFiltered = top.users.filter( user => {
				//console.log(user.id, key.UserId);
				return (user.id === key.UserId) 
			});

			if (usersFiltered.length === 1){
				user = usersFiltered[0];
			}

			return {
				...key,
				...{user: user},
			}
		})
		.filter( key => key.user );

		//console.log(keysWithUsers);

		return keysWithUsers;

	}

	_saveTopHandler = () => (e) => {
		e.preventDefault();

		this.props.saveResults();
	}

	_deleteTopHandler = () => (e) => {
		e.preventDefault();

		this.props.deleteResults();
	}

	_adminButtons(){
		const { props } = this;

		if (props.profile.roles.indexOf('System') === -1){
			return null;
		}

		return(
			<div>
				<br/><br/>
			<p>
				Кнопка для админа, не трогать!
			</p>
			{
				props.top.fixed
				?
				(
				<Button
					mixClass="team-select__button"
					size="s"
					color="orange"
					type="button"
					onClickHandler={this._deleteTopHandler()}
				>
					<span className="button__text">Удалить зафиксированный топ</span>
				</Button>
				)
				:
				(
				<Button
					mixClass="team-select__button"
					size="s"
					color="orange"
					type="button"
					onClickHandler={this._saveTopHandler()}
				>
					<span className="button__text">Зафиксировать топ</span>
				</Button>
				)
			}
			<br/><br/>
			</div>

		);
	}

	render(){
		const { props } = this;

		const sortedTop = this._sortTop(props.top);

		return(
			<div className="app__page top">

				<AppLogo 
					mixClass="app__logo"
					href="/kids"
				/>

				<div className="app__content">

					<div className="app__back-placeholder">

						<Link href="/kids" mixClass="app__back">
							НА ГЛАВНУЮ
						</Link>

					</div>

					<h1 className="app__title">
						РЕЙТИНГ УЧАСТНИКОВ ТОП 100
					</h1>

					{this._adminButtons()}

					{
						props.top.fixed 
						? 
						(
							<div className="top__fixed">
								Конкурс завершен 3.09.2016 в 10:00 (Мск). <br/> Результаты больше не обновляются!
							</div>
						)
						:
						null
					}

					<div className="top__people people">

						<ul className="people__list">

							{sortedTop.map( (item, i) => (

							<li className="people__item" key={'people-' + i}>

								<div className="people__start">

									<div className="people__profile">

										<div className="people__avatar-placeholder">

											<img src={item.user.photoSmall} alt="" className="people__avatar"/>

										</div>

										<div className="people__name">
											<a 	href={PromoOptions.server + '/user/user.aspx?user=' + item.user.id} 
												className="people__href" 
												target="_blank"
											>
												{item.user.firstName}
											</a>
										</div>

									</div>

								</div>

								<div className="people__data">
									
									<div className="people__score">
										Очки {item.totalPoints}
									</div>
									
									<div className="people__score">
										Время {parseTime(item.totalTime)}
									</div>

								</div>

							</li>

							))}

						</ul>

					</div>

				</div>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
	top: state.top,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getAllResults: () => dispatch(asyncActions.getAllResults()),
	saveResults: () => dispatch(asyncActions.saveResults()),
	deleteResults: () => dispatch(asyncActions.deleteResults()),
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)),
	goTo: (page) => dispatch(pageActions.setPage(page)),
});

Only.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Only);
