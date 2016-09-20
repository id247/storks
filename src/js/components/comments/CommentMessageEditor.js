import React from 'react';
import { connect } from 'react-redux';

import { HTMLdecode } from '../../helpers/escape';

import Button 				from '../../components/common/Button';

import * as asyncActions 	from '../../actions/async';
import * as commentsActions 	from '../../actions/comments';

class CommentMessageEditor extends React.Component {


	_editCommentHandler = () => (e) => {
		e.preventDefault();

		const newMessage = e.target.elements.newMessage ? e.target.elements.newMessage.value : false;
		const newQuoteMessage = e.target.elements.newQuoteMessage ? e.target.elements.newQuoteMessage.value : '';

		if (!newMessage){
			return false;
		}

		const data = {
			newMessage,
			newQuoteMessage,
		}

		this.props.editComment(data);
	}

	_cancelHandler = () => (e) => {
		e.preventDefault();
		this.props.commentsEditOff();
	}

	render(){
		const { props } = this;
		const { comment } = props;
		
		if (!comment || Object.keys(comment).length === 0 ){
			return false;
		}

		let value;
		let quoteValue;

		try {
			value = JSON.parse(HTMLdecode(comment.Value));
		}catch(e){
			console.error(e);
			console.error('error JSON in comment ' + comment.Key);
			return (<div>error JSON in comment {comment.Key}</div>);
		}

		try {
			quoteValue = value.quote ? JSON.parse(HTMLdecode(value.quote.Value)) : false;
		}catch(e){
			console.error(e);
			console.error('error JSON in comment quote ' + comment.Key);
			return (<div>error JSON in comment {comment.Key}</div>);
		}

		console.log(value);
		console.log(quoteValue);

		return(
			<form className="comment__editor comment-editor" action="#"
				onSubmit={this._editCommentHandler()}
			>
				
				<div className="comment-editor__row">

					<div className="comment-editor__title">
						Текст сообщения
					</div>
				
					<textarea 
						className="comment-editor__textarea" 
						name="newMessage" cols="30" rows="10" 
						defaultValue={value.message} 
					/>

				</div>

				{
					quoteValue
					? (
						<div className="comment-editor__row">

							<div className="comment-editor__title">
								Текст цитаты
							</div>
						
							<textarea 
								className="comment-editor__textarea" 
								name="newQuoteMessage" cols="30" rows="10" 
								defaultValue={quoteValue.message} 
							/>

						</div>
					)
					: null
				}
				
				
				<div className="comment-editor__buttons">

					<Button 
						type="button" 
						mixClass="comment-editor__button" 
						color="blue-light"
						size="s"
						onClickHandler={this._cancelHandler()}
					>
						Отмена
					</Button>

					<Button 
						type="submit" 
						mixClass="comment-editor__button" 
						color="blue-light"
						size="s"
					>
						Сохранить
					</Button>
										
				</div>
			</form>
		);
	}
}


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	editComment: (data) => dispatch(asyncActions.editComment(ownProps.comment, data)),
	commentsEditOff: () => dispatch(commentsActions.editOff()),
});

CommentMessageEditor.propTypes = {
	comment: React.PropTypes.oneOfType([
    	React.PropTypes.bool,
    	React.PropTypes.object,
    ]).isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentMessageEditor);
