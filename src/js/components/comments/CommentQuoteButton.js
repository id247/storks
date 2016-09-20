import React from 'react';

import Button from '../../components/common/Button';

const CommentQuoteButton = (props) => {
	
	if (!props.visible){
		return null;
	}

	return(
		<div className="comment__quote-it-placeholder">

			<Button
				mixClass="comment__quote-it"
				color="orange"
				size="s"
				onClickHandler={props.onClickHandler}
			>
				<span className="button__text">Ответить</span>
			</Button>

		</div>
	)
};

CommentQuoteButton.propTypes = {
	mixClass: React.PropTypes.string,
	onClickHandler: React.PropTypes.func.isRequired,
    visible: React.PropTypes.bool.isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default CommentQuoteButton;
