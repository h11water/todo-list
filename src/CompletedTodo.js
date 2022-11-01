import React from 'react';
import "./style.css"
function CompletedTodo({ todo }) {
	return (
		<>
			<div style={{display:"flex"}}>
				<div className="todoItem" style={{ backgroundColor: 'black' ,flex:"3"}}>
					{todo.name}
				</div>
				<div className="todoItem" style={{ backgroundColor: 'black',flex:"1", marginLeft:"1px"}}>
					{String(Intl.DateTimeFormat("en").format(new Date(todo.dateCompleted)))}
				</div>
			</div>

		</>

	);
}

export default CompletedTodo;