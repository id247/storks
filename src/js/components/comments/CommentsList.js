import React from 'react';
import { connect } from 'react-redux';

import Comment from '../../components/comments/Comment';

class CommentsList extends React.Component {

	componentWillMount(){
	}

	render(){
		const { props } = this;

		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' comments-list')}>

				<ul className="comments-list__list">

					{props.comments.map( (comment, i) => (

						<Comment 
							mixClass="comments-list__item"
							comment={comment}
							label={props.label}
							key={'comment' + comment.Id}
						/>

					))}

				</ul>

			</div>
		);
	}
}


const mapStateToProps = (state, ownProps) => ({
	comments: state.comments.list,
	label: state.comments.label,
	pageNumber: state.comments.page,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

CommentsList.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
