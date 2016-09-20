import React from 'react';

const CommentMessage = (props) => (
	<div className="comment__text text">			
		{props.message.split('\n').map( (item, i) => (
			<p key={props.commentId + '-' + i + new Date().getTime()}>
				{item}
			</p>
		))}
	</div>
);

CommentMessage.propTypes = {
	mixClass: React.PropTypes.string,
	message: React.PropTypes.string,
	commentId: React.PropTypes.number.isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default CommentMessage;
