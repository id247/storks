import React from 'react';
import { connect } from 'react-redux';

import * as pageActions from '../../actions/page';

const Link = (props) => (
	<a href={'#' + props.href} className={( (props.mixClass ? props.mixClass : '') + ' link')}
		onClick={ (e) => {
			e.preventDefault();
			props.goTo();
		}}
	>
		{props.children}
	</a>
);

const mapStateToProps = null;

const mapDispatchToProps = (dispatch, ownProps) => ({
	goTo: () => dispatch(pageActions.setPage(ownProps.href)),
});

Link.propTypes = {
	mixClass: React.PropTypes.string,
	href: React.PropTypes.string.isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Link);
