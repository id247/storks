import React from 'react';
import { connect } from 'react-redux';

//import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class Kids extends React.Component {

	componentWillMount(){
		const { props } = this;

		if (props.profile.roles.indexOf('EduStudent') === -1){
			props.redirect('/kids/only');

			return false;
		}

	}

	render(){
		const { props } = this;

		return props.children;
	}
}



const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)),
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
