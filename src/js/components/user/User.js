import React from 'react';
import { connect } from 'react-redux';

import { ForumOptions } from 'appSettings';

import * as asyncActions from '../../actions/async';

class User extends React.Component {

	_logoutHandler = () => (e) => {
		e.preventDefault();
		this.props.logout();
	}

	render(){
		const { props } = this;

		const avatar = props.profile.photoMedium;

		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' login')}>

				<div className="user__avatar-placeholder">

					<img src={avatar} alt="" className="user__avatar" />

				</div>

				<div className="user__content">
					
					<div className="user__name-outer">
						<div className="user__name">
							{props.profile.firstName}  {props.profile.lastName} 
						</div>
					</div>

					<div className="user__logout">

						<button 
							className="button button--s button--orange"
							onClick={this._logoutHandler()}
						>
							<span className="button__text">Выход</span>
						</button>

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
	logout: () => dispatch(asyncActions.logout()), 
});

User.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
