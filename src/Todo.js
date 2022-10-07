import React from 'react';

function Todo({todo, handleMarkComplete}) {
	function checkBoxOnChnage(){
		handleMarkComplete(todo.id)
	}

	return (
		<div>
			<label>
				<input type="checkbox" defaultChecked = {todo.complete} onChange={checkBoxOnChnage}/>
				{todo.name}
			</label>
		</div>
	);
}

export default Todo;