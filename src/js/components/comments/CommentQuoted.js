import React from 'react';

import { HTMLdecode } from '../../helpers/escape';

import CommentMessage 			from '../../components/comments/CommentMessage';
import CommentInfo 			from '../../components/comments/CommentInfo';
import CommentAvatar 			from '../../components/comments/CommentAvatar';

class CommentQuoted extends React.Component {

	render(){
		const { props } = this;
		const { comment } = props;

		if (!comment || Object.keys(comment).length === 0 ){
			return false;
		}
		let value;

		try{
			value = JSON.parse(HTMLdecode(comment.Value));
		}catch(e){
			console.error(e);
			console.error('error JSON in comment ' + (props.parentCommentKey ? props.parentCommentKey : 'quoted comment') ) ;
			return false;
		}

		return (
			<div className={( (props.mixClass ? props.mixClass : '') + ' comment comment--quoted')}>

				<CommentAvatar 
					image={value.user.photoSmall}
				/>

				<div className="comment__content">

					<CommentInfo 
						comment={comment}
						user={value.user}
					/>

					<CommentMessage 
						message={value.message} 
						commentId={comment.Id}
					/>

				</div>

			</div>
		)
	}
};


CommentQuoted.propTypes = {
	mixClass: React.PropTypes.string,
	parentCommentKey: React.PropTypes.string,
	comment: React.PropTypes.oneOfType([
    	React.PropTypes.bool,
    	React.PropTypes.object,
    ]),
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default CommentQuoted;
