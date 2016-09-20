import React from 'react';

import Button from '../../components/common/Button';

const CommentAdmin = (props) => {

	if (!props.visible){
		return null;
	}

	return(
		<div className={( (props.mixClass ? props.mixClass : '') + ' comment-admin')}>

			{
				(props.isSystem)
				?
				<Button 
					mixClass="comment-admin__button"
					color="orange"
					size="s"
					onClickHandler={props.deleteCommentHandler}
				>
					<span className="button__text">Удалить</span>
				</Button>
				:
				null
			}

			<Button 
				mixClass="comment-admin__button"
				color="orange"
				size="s"
				onClickHandler={props.editCommentHandler}
			>
				<span className="button__text">Редактировать</span>
			</Button>

		</div>

	)
};

CommentAdmin.propTypes = {
	mixClass: React.PropTypes.string,
	visible: React.PropTypes.bool.isRequired,
	deleteCommentHandler: React.PropTypes.func.isRequired,
	editCommentHandler: React.PropTypes.func.isRequired,
	isSystem: React.PropTypes.bool.isRequired,
	
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default CommentAdmin;
