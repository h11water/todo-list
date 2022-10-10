import React from 'react';
import Todo from './Todo';

function TodoList({ todos, handleMarkComplete }) {


	return (
		<div className="todoList">
			{
			todos.map(todo => {
				return <Todo key={todo.id} todo={todo} handleMarkComplete={handleMarkComplete} />
			})
			}
		</div>

	);
}

export default TodoList;