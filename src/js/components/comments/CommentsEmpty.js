import React from 'react';

import Button from '../../components/common/Button';

const CommentsEmpty = (props) => (
	<div className={( (props.mixClass ? props.mixClass : '') + ' comments-empty')}>

		<div className="comments-empty__text">
			<p>
				
			</p>
		</div>

	</div>
);

CommentsEmpty.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default CommentsEmpty;
