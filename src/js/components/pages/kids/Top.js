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
											<a href={PromoOptions.server + '/user/user.aspx?user=' + item.user.id} class="people__href" target="_blank">
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
