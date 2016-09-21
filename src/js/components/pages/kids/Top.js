import React from 'react';
import { connect } from 'react-redux';

import AppLogo from '../../../components/common/AppLogo';
import Link from '../../../components/common/Link';
import Button from '../../../components/common/Button';

//import * as asyncActions from '../../actions/async';
import * as pageActions from '../../../actions/page';

class Only extends React.Component {

	componentWillMount(){
		const { props } = this;

	}

	render(){
		const { props } = this;

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
						РЕЙТИНГ УЧАСТНИКОВ
					</h1>

					<div className="top__people people">

						<ul className="people__list">

							{[
								'Василий',
								'Иван',
								'Дмитрий',
								'Наташа',
								'Александр',
								'Ирина',
							].map( (name, i) => (

							<li className="people__item" key={'people-' + i}>

								<div className="people__start">

									<div className="people__profile">

										<div className="people__avatar-placeholder">

											<img src="https://static.dnevnik.ru/images/avatars/user/a.s.jpg" alt="" className="people__avatar"/>

										</div>

										<div className="people__name">
											{name}
										</div>

									</div>

								</div>

								<div className="people__data">
									
									<div className="people__score">
										Очки 45
									</div>
									
									<div className="people__score">
										Время 0:56.5
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
});

const mapDispatchToProps = (dispatch, ownProps) => ({
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
