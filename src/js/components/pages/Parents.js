import React from 'react';
import { connect } from 'react-redux';

//import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class Parents extends React.Component {

	componentWillMount(){
		const { props } = this;

		if (props.profile 
			&& props.profile.roles.indexOf('System') === -1
			&& props.profile.roles.indexOf('EduParent') === -1
		){
			props.redirect('/parents/only');
		}

	}

	render(){
		const { props } = this;

		if (!props.profile){
			return null;
		}

		return props.children;
	}
}



const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)),
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
