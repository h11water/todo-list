import React from 'react';
import "./style.css"
import MyTooltip from './components/MyTooltip';
import ReactTooltip from "react-tooltip";

function Todo({ todo, handleMarkComplete }) {
	function checkBoxOnChange() {
		handleMarkComplete(todo.id)
	}

	function hoverDate() {
		//console.log(new Date(todo.dateAdded).toDateString())
	}

	return (
		<>
			{/*
			<ReactTooltip place="right" type="dark" effect="solid" />*/}
			<div className="todoContainer">
				<input type="checkbox" className="form-check-input" onChange={checkBoxOnChange} checked={todo.complete} />

				<label className="todoItem" onMouseEnter={hoverDate} data-delay-show='30' data-tip={new Date(todo.dateAdded).toDateString()}
				onClick={checkBoxOnChange}
				>
					{todo.name}
				</label>
			</div>


		</>

	);
}

export default Todo;