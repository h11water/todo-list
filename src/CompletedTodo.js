import React from 'react';
import "./style.css"
function CompletedTodo({todo}) {
	return (
		<>
			<div className="todoItem" style={{backgroundColor:'black'}}>
				{JSON.stringify(todo)}
			</div>
		</>

	);
}

export default CompletedTodo;