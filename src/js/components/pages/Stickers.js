import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class Stickers extends React.Component {

	_selectActivityHandler = (activity) => (e) => {
		e.preventDefault();

		this.props.setPage('/' + activity);
	}

	render(){
		const { props } = this;
		return(
			<div className="app__page stickers">

				<div className="stickers__logo storks-logo">
					Аисты
				</div>

				<div className="stickers__counters counters">

					<ul className="counters__list">

						<li className="counters__item">

							<div className="counters__content">

								<div className="counters__title">
									<span className="counters__text">
										МОИ БАЛЛЫ
									</span>
								</div>

								<div className="counters__data">
									<span className="counters__text">
										100
									</span>
								</div>

							</div>

						</li>

					</ul>

				</div>

				<div className="stickers__content">


					<h1 className="stickers__title">
						ОТПРАВЬ ДРУГУ СТИКЕР!
					</h1>

					<ul className="stickers__list">

						{[1,2,3,1,2,3,1,2].map( (sticker, i) => (

							<li className="stickers__item stickers-item" key={'sticker' + i}>

								<label className="stickers-item__label">

									<input type="radio" name="sticker" className="stickers-item__input"/>

									<span className="stickers-item__image-placeholder">

										<img src={(PromoOptions.cdn + 'images/stickers/' + sticker + '.png')} alt="" />

									</span>

								</label>

							</li>

						))}

					</ul>

					<div className="stickers__button-placeholder">


						<Button
							mixClass="team-select__button"
							size="m"
							color="orange"
							type="button"
							onClickHandler={props.login}
						>
							<span className="button__text">Отправить</span>
						</Button>

					</div>

				</div>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	//profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setPage: (page) => dispatch(pageActions.setPage(page)),
});

Stickers.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stickers);
