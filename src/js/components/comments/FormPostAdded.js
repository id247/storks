import React from 'react';

const FormPostAdded = (props) => {

	if (!props.commentAdded){
		return null;
	}

	return(
		<div className="comments-form__comment-added text">
			Спасибо! Ваше сообщение было отправлено!
		</div>
	);
};

FormPostAdded.propTypes = {
	mixClass: React.PropTypes.string,
	commentAdded: React.PropTypes.bool.isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default FormPostAdded;
