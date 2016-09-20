import React from 'react';
import { connect } from 'react-redux';

import AppLogo from '../../components/common/AppLogo';

import Comments from '../../components/comments/Comments';

//import * as asyncActions from '../../actions/async';
//import * as pageActions from '../../actions/page';

class Parents extends React.Component {

	_selectActivityHandler = (activity) => (e) => {
		e.preventDefault();

		this.props.setPage('/' + activity);
	}

	render(){
		const { props } = this;

		//if (props.profile.users)

		return(
			<div className="app__page home-parents">

				<AppLogo 
					mixClass="app__logo"
					href="/"
				/>

				<div className="home-parents__content">

					<h1 className="home-parents__title">
						Расскажите свою историю
					</h1>

					<div className="home-parents__text text">
						<p>
							Вспомните интересные истории о том, как вы боролись с «почемучками» и рассказывали своим детям о взрослой жизни
						</p>
					</div>

					<Comments mixClass="home-parents__comments" />

				</div>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

Parents.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Parents);
