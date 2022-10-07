import React from 'react';
import Todo from './Todo';

function TodoList({todos, handleMarkComplete}) {


	return (
		
		todos.map(todo =>{
			return <Todo key={todo.id} todo={todo} handleMarkComplete={handleMarkComplete}/>
		})
	);
}

export default TodoList;