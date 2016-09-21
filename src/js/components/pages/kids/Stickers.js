import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import AppLogo from '../../../components/common/AppLogo';
import Button from '../../../components/common/Button';

import * as asyncActions from '../../../actions/async';
import * as pageActions from '../../../actions/page';

class Stickers extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			showFriends: false,
		};

	}

	_showFriends(){

		this.setState({
			...this.state,
			...{
				showFriends: true,
			}
		});
	}

	_hideFriends(){

		this.setState({
			...this.state,
			...{
				showFriends: false,
			}
		});
	}

	_showFriendsHandler = () => (e) => {
		e.preventDefault();

		this._showFriends();
	}

	_hideFriendsHandler = () => (e) => {
		e.preventDefault();

		this._hideFriends();
	}

	render(){
		const { props, state } = this;
		return(
			<div className="app__page stickers">

				<AppLogo 
					mixClass="app__logo"
					href="/kids"
				/>

				<div className="app__counters counters">

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

				{
					state.showFriends
					?
					(
						<div className="stickers__content">

							<div className="stickers__people people">

								<ul className="people__list">

									{[
										'Василий',
										'Иван',
										'Дмитрий',
										'Наташа',
										'Александр',
										'Ирина',
									].map( (name, i) => (

									<li className="people__item" key={'friend-' + i}>

										<div className="people__profile">

											<div className="people__avatar-placeholder">

												<img src="https://static.dnevnik.ru/images/avatars/user/a.s.jpg" alt="" className="people__avatar"/>

											</div>

											<div className="people__name">
												{name}
											</div>

										</div>




										<div className="people__data">
										
										{
											i === 3
											?
											(
												<span className="people__send">Отправлено</span>
											)
											:
											(
											<Button
												mixClass="people__button"
												size="s"
												color="orange"
												type="button"
												//onClickHandler={this._showFriendsHandler()}
											>
												<span className="button__text">Отправить</span>
											</Button>
											)
										}

										</div>

									</li>

									))}

								</ul>

							</div>

							<div className="stickers__button-placeholder">


								<Button
									mixClass="team-select__button"
									size="m"
									color="orange"
									type="button"
									onClickHandler={this._hideFriendsHandler()}
								>
									<span className="button__text">Выбрать другой стикер</span>
								</Button>

							</div>

						</div>
					)
					:
					(
						<div className="stickers__content">


							<h1 className="stickers__title">
								ВЫБЕРИ СТИКЕР
							</h1>

							<ul className="stickers__list">

								{[1,2,3,4,5,6,7,8].map( (sticker, i) => (

									<li className="stickers__item stickers-item" key={'sticker' + i}>

										<label className="stickers-item__label">

											<input type="radio" name="sticker" 
											className="stickers-item__input"
											defaultChecked={i===0}
											/>

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
									onClickHandler={this._showFriendsHandler()}
								>
									<span className="button__text">Отправь другу</span>
								</Button>

							</div>

						</div>						
					)
				}



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
