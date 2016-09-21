import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Loading 		from '../components/loading/Loading';
import ErrorMessage from '../components/error/ErrorMessage';

import App 			from '../components/App';

import Team 		from '../components/pages/Team';

import Parents 			from '../components/pages/Parents';
import ParentsHistories from '../components/pages/parents/Histories';
import ParentsOnly 		from '../components/pages/parents/Only';

import Kids 		from '../components/pages/Kids';
import KidsIndex 	from '../components/pages/kids/Kids';
import Quiz 		from '../components/pages/kids/Quiz';
import Game 		from '../components/pages/kids/Game';
import Stickers 	from '../components/pages/kids/Stickers';
import Top 			from '../components/pages/kids/Top';
import KidsOnly 	from '../components/pages/kids/Only';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Team} />
			
			<Route path="parents" component={Parents}>
				<IndexRoute component={ParentsHistories} />
				<Route path="only" component={ParentsOnly} />
			</Route>

			<Route path="kids" component={Kids}>
				<IndexRoute component={KidsIndex} />
				<Route path="quiz" component={Quiz} />
				<Route path="game" component={Game} />
				<Route path="stickers" component={Stickers} />
				<Route path="top" component={Top} />
				<Route path="only" component={KidsOnly} />
			</Route>

		</Route>		
	</Router>
);

class Root extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store}>		
				<div className="app">
					{routes}
					
					<Loading 
						mixClass="app__loader"
						visibleClass="loader--visible"
					/>
					
					<ErrorMessage 
						mixClass="app__error"
					/>
				</div>
			</Provider>
		);
	}
}

export default Root;

