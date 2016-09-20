import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import CommentQuoted from '../../components/comments/CommentQuoted';

import * as commentsFormActions from '../../actions/comments-form';

const FormQuote = (props) => {
	if (!props.quote){
		return false;
	}

	return (
		<div className="comments-form__quote comments-form-quote">

			<div className="comments-form-quote__top">

				<div className="comments-form-quote__title">
					Цитата:
				</div>

				<div className="comments-form-quote__delete-placeholder">

					<Button
						mixClass="comments-form-quote__button"
						color="orange"
						size="xs"
						onClickHandler={props.deleteQuote}
					>
						&times; Отменить цитирование
					</Button>

				</div>

			</div>

			<CommentQuoted 
				mixClass="comments-form-quote__post" 
				comment={props.quote}
			/>
			
		</div>
	)
};

const mapStateToProps = (state, ownProps) => ({
	quote: state.commentsForm.quote,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	deleteQuote: () => dispatch(commentsFormActions.deleteQuote()),
});

FormQuote.propTypes = {
//	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormQuote);
