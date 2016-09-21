import React from 'react';
import { connect } from 'react-redux';

const PointsCounter = (props) => (

	<li className="counters__item">

		<div className="counters__content">

			<div className="counters__title">
				<span className="counters__text">
					МОИ БАЛЛЫ
				</span>
			</div>

			<div className="counters__data">
				<span className="counters__text">
					{props.points}
				</span>
			</div>

		</div>

	</li>
);

const mapStateToProps = (state, ownProps) => ({
	points: state.results.quizPoints + state.results.gamePoints + state.results.friendsIds.length * 5,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

PointsCounter.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PointsCounter);
