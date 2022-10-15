import React from 'react';
import CompletedTodo from './CompletedTodo';
import Todo from './Todo';

function TodoList({ todos, handleMarkComplete, listType }) {
	return (
		listType === "incomplete" ?
			<div className="todoList">
				{
					todos.length > 0 ?
						todos.map(todo => {
							return <Todo key={todo.id} todo={todo} handleMarkComplete={handleMarkComplete} />
						})
					:<div>Nothing to do.</div>
				}
			</div>
			:
			<div>
				{
					todos.length > 0 ?
						todos.map(todo => {
							return <CompletedTodo key={todo.id} todo={todo} handleMarkComplete={handleMarkComplete}/>
						})
					:<div>Nothing completed.</div>
				}
			</div>

	);
}

export default TodoList;