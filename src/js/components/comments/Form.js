import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import FormQuote 		from '../../components/comments/FormQuote';
import FormPostAdded 	from '../../components/comments/FormPostAdded';
import FormAnon 		from '../../components/comments/FormAnon';

import * as asyncActions 		from '../../actions/async';
import * as commentsFormActions 	from '../../actions/comments-form';


class Form extends React.Component {

	_submitForm(form){

		if (!this._formValidate()){
			return false;
		}

		this.props.commentsFormSubmit();
	}

	_formValidate(){
		const formMessageTextarea = this.refs.form.elements.message;

		if (formMessageTextarea.value.length === 0){
			formMessageTextarea.classList.add('error');
			return false;
		}else{
			formMessageTextarea.classList.remove('error');
		}
		return true;
	}

	_commentsFormChange(data){
		this.props.formChange(data);
	}

	_submitFormHandler = () => (e) => {
		e.preventDefault();
		this._submitForm(e.target);
	}

	_messageChangeHandler = () => (e) => {
		const data = {...this.props.commentsForm, ...{message: e.target.value}}
		this._commentsFormChange(data);
		this._formValidate();
	}

	_anonChangeHandler = () => (e) => {
		const data = {...this.props.commentsForm, ...{anon: e.target.checked}}
		this._commentsFormChange(data);
	}

	_deleteQuoteHandler = () => (e) => {
		this.props.deleteQuote();
	}

	render(){
		const { props } = this;

		return(
			<form 
				className={( (props.mixClass ? props.mixClass : '') + ' comments-form')}
				onSubmit={this._submitFormHandler()}
				method="post"
				action="#"
				ref="form"
			>	
				<h4 className="comments-form__title">
					Смешной момент из жизни вашего ребенка
				</h4>

				<div className="comments-form__textarea-placeholder">

					<textarea 
						name="message" 
						cols="30" 
						rows={7}
						className="comments-form__textarea"
						placeholder=""
						value={props.commentsForm.message}
						onChange={this._messageChangeHandler()}
					/>

					<div className="comments-form__placeholder"
						style={{
							display: props.commentsForm.message.length > 0 ? 'none' : '',
						}}
					>
						Например: <br/>
						— Мам, ты меня откуда скачала? <br/>
						— Я тебя родила, сынок!!
					</div>

				</div>

				<FormPostAdded 
					commentAdded={props.commentsForm.commentAdded}
				/>

				<FormQuote 
					quote={props.quote}
					deleteQuoteHandler={this._deleteQuoteHandler()}
				/>

				<div className="comments-form__bottom">

					<div className="comments-form__action-placeholder">

						<Button 
							type="submit" 
							mixClass="comments-form__button"
							size="m"
							color="orange"
						>
							<span className="button__text">Отправить</span>
						</Button>
						
					</div>

					{(
						false 
						? 	<FormAnon 
								checked={props.commentsForm.anon}
								onChangeHandler={this._anonChangeHandler()}
							/>
						: null
					)}

					

				</div>

			</form>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: state.user,
	quote: state.comments.quote,
	commentsForm: state.commentsForm,
	label: state.comments.label,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	formChange: (data) => dispatch(commentsFormActions.formChange(data)),	
	commentsFormSubmit: () => dispatch(asyncActions.commentsFormSubmit()),	
	deleteQuote: () => dispatch(commentsFormActions.deleteQuote()),
});

Form.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
