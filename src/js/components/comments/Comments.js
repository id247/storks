import React from 'react';
import { connect } from 'react-redux';

import { CommentsOptions } from 'appSettings';

import * as commentsActions from '../../actions/comments';
import * as asyncActions from '../../actions/async';

import Form from '../../components/comments/Form';
import CommentsList from '../../components/comments/CommentsList';
import CommentsEmpty from '../../components/comments/CommentsEmpty';
import Pagination from '../../components/comments/Pagination';

class Comments extends React.Component {
	
	componentWillMount(){
		const { props } = this;

		this._setLabel();

		props.getComments();
	}

	componentWillReceiveProps(nextProps){

		const { props } = this;
		const oldPageNumber = props.pageNumber ? parseInt(props.pageNumber) : 1;
		const newPageNumber = nextProps.pageNumber ? parseInt(nextProps.pageNumber) : 1;

		if (oldPageNumber !== newPageNumber){
			props.getComments();
		}
	}
	
	_setLabel(){
		const { props } = this;

		let host = document.location.host;
		let pathname = document.location.pathname;

		if (pathname[pathname.length - 1] === '/'){
			pathname = pathname.slice(0, -1);
		}

		const label = (host + pathname);
		
		props.setCommentsLabel(label);
	}
	

	render(){
		const { props } = this;
		const pagesCount = Math.ceil(props.commentsTotalCount / CommentsOptions.pageSize);
		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' comments')}>
					
				<div className="comments__content">
					
					<Form mixClass="comments__form" />
					
					{ 
						props.commentsTotalCount > 0
						?	<CommentsList 
								mixClass="comments__list" 
							/>
						: 
							<CommentsEmpty 
								mixClass="comments__empty" 
							/>
					}
					
					
					<Pagination
						mixClass="comments__pagination"
						pagesCount={pagesCount}
					/>
				</div>

			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	commentsTotalCount: state.comments.itemsTotalCount,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setCommentsLabel: (label) => dispatch(commentsActions.setLabel(label)),
	getComments: () => dispatch(asyncActions.getComments()),
});

Comments.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
