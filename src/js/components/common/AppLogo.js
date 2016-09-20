import React from 'react';
import { connect } from 'react-redux';

import * as pageActions from '../../actions/page';

const AppLogo = (props) => (
	<div className={( (props.mixClass ? props.mixClass : '') + ' storks-logo')}>
		<button 
			className="storks-logo__button"
			onClick={ (e) => {
				e.preventDefault();
				props.goTo();
			}}
		>
			Аисты
		</button>
	</div>
);

const mapStateToProps = null;

const mapDispatchToProps = (dispatch, ownProps) => ({
	goTo: () => dispatch(pageActions.setPage(ownProps.href)),
});

AppLogo.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AppLogo);
