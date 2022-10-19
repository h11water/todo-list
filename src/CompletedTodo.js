import React from 'react';
import "./style.css"
function CompletedTodo({todo}) {
	return (
		<>
			<div className="todoItem" style={{backgroundColor:'black'}}>
				{todo.name}
			</div>
		</>

	);
}

export default CompletedTodo;