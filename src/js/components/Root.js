import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Loading 		from '../components/loading/Loading';
import ErrorMessage from '../components/error/ErrorMessage';

import App 			from '../components/App';

import Team 		from '../components/pages/Team';
import Home 		from '../components/pages/Home';
import Quiz 		from '../components/pages/Quiz';
import Game 		from '../components/pages/Game';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="team" component={Team} />
			<Route path="quiz" component={Quiz} />
			<Route path="game" component={Game} />
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

