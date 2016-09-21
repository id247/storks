import React from 'react';
import { connect } from 'react-redux';

import { parseTime } from '../../helpers/time';

const TimeCounter = (props) => (

	<li className="counters__item">

		<div className="counters__content">

			<div className="counters__title">
				<span className="counters__text">
					ВРЕМЯ
				</span>
			</div>

			<div className="counters__data">
				<span className="counters__text">
					{props.time}
				</span>
			</div>

		</div>

	</li>
);

const mapStateToProps = (state, ownProps) => ({
	time: parseTime(state.results.quizTime + state.results.gameTime),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

TimeCounter.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeCounter);
