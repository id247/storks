import React from 'react';
import { connect } from 'react-redux';

import { HTMLdecode } from '../../helpers/escape';

import { CommentsOptions }		from 'appSettings';


import Button 					from '../../components/common/Button';

import CommentQuoted 			from '../../components/comments/CommentQuoted';
import CommentMessage 			from '../../components/comments/CommentMessage';
import CommentInfo 				from '../../components/comments/CommentInfo';
import CommentLikes 			from '../../components/comments/CommentLikes';
import CommentAvatar 			from '../../components/comments/CommentAvatar';
import CommentQuoteButton 		from '../../components/comments/CommentQuoteButton';
import CommentMessageEditor 	from '../../components/comments/CommentMessageEditor';
import CommentAdmin 			from '../../components/comments/CommentAdmin';

import * as asyncActions 		from '../../actions/async';
import * as commentsActions 	from '../../actions/comments';

class Comment extends React.Component {

	_deleteCommentHandler = () => (e) =>{
		e.preventDefault();	
		this.props.deleteComment();	
	}


	_editCommentHandler = () => (e) =>{
		e.preventDefault();	
		this.props.editCommentsOn();	
	}

	_addQuoteHandler = () => (e) =>{
		e.preventDefault();	
		this.props.addQuote();	
	}

	_voteHandler = () => (e) =>{
		e.preventDefault();	
		this.props.vote();	
	}

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
			console.error('error JSON in comment ' + comment.Key);
			return false;
		}


		const isAdmin = (value.user.id !== 0 && CommentsOptions.adminId.indexOf(value.user.id) > -1 );
		const icanEditComment = 
							(	
								value.user.id !== 0 
								&& 
								CommentsOptions.adminId.indexOf(props.profile.id_str) > -1 
								&&
								value.user.id === props.profile.id_str
							);

		let likesText = 'Это смешно';

		//console.log(comment.UserId.toString());
		//console.log(comment.UserId);
		//console.log(props.profile.id_str);
		
		return (

			<li className={( (props.mixClass ? props.mixClass : '') + ' comment ' + (isAdmin ? 'comment--super' : '') )} key={'comment' + comment.Id}>

				<CommentAvatar 
					image={value.user.photoSmall}
				/>

				<div className="comment__content">

					<CommentInfo 
						comment={comment}
						user={value.user}
						isAdmin={isAdmin}
					/>

					{
						comment.Key !== props.edit
						?	<CommentMessage 
								message={value.message} 
								commentId={comment.Id}
							/>
						: 	<CommentMessageEditor
								comment={comment}
							/>
					}
					
					{
						comment.Key !== props.edit
						?	
						<CommentQuoted 
							mixClass="comment__quote" 
							comment={value.quote}
							parentCommentKey={comment.Key}
						/>
						: null
					}

					<div className="comment__bottom">

						<CommentLikes 
							counter={comment.counter}
							text={likesText}
							clickHandler={this._voteHandler()}
						/>

						{/*<CommentQuoteButton 
							visible={true}
							onClickHandler={this._addQuoteHandler()}
						/>*/}
						
					</div>

				</div>

				<CommentAdmin 
					mixClass="comment__admin"
					isSystem={props.profile.roles.indexOf('System') > -1}
					visible={
						props.profile.roles.indexOf('System') > -1 
						|| 
						icanEditComment
					}
					deleteCommentHandler={this._deleteCommentHandler()}
					editCommentHandler={this._editCommentHandler()}
				/>

			</li>

		)
	}
};


const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
	edit: state.comments.edit,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	deleteComment: () => dispatch(asyncActions.deleteComment(ownProps.comment.Key)),
	editCommentsOn: () => dispatch(commentsActions.editOn(ownProps.comment.Key)),
	addQuote: () => dispatch(asyncActions.addQuote(ownProps.comment)),
	vote: () => dispatch(asyncActions.vote(ownProps.comment.Id)),
});

Comment.propTypes = {
	mixClass: React.PropTypes.string,
	quoted: React.PropTypes.bool,
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

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
