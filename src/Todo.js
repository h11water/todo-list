import React from 'react';
import "./style.css"

function Todo({todo, handleMarkComplete}) {
	function checkBoxOnChnage(){
		handleMarkComplete(todo.id)
	}

	return (
		<div className="todoItem">
			<label>
				<input type="checkbox" defaultChecked = {todo.complete} onChange={checkBoxOnChnage}/>
				{todo.name}
			</label>
		</div>
	);
}

export default Todo;