import React from 'react';
import { connect } from 'react-redux';

import AppLogo from '../../../components/common/AppLogo';
import Button from '../../../components/common/Button';

//import * as asyncActions from '../../actions/async';
import * as pageActions from '../../../actions/page';

class Only extends React.Component {

	componentWillMount(){
		const { props } = this;

		if (props.profile.roles.indexOf('EduStudent') > -1){
			props.redirect('/kids');
		}

	}

	_goBackHandler = () => (e) => {
		e.preventDefault();
		this.props.goTo('/');
	}

	render(){
		const { props } = this;

		return(
			<div className="app__page">

				<AppLogo 
					mixClass="app__logo"
					href="/"
				/>

				<div className="app__content">

					<h1 className="app__title">
						Доступ только для детей
					</h1>

					<div className="app__text text">
						<p>

						</p>
					</div>

					<div className="app__buttons">

						<div className="button-placeholder">
					

							<Button
								mixClass="game-results__button"
								size="m"
								color="orange"
								type="button"
								onClickHandler={this._goBackHandler()}
							>
								<span className="button__text">Вернуться назад</span>
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
