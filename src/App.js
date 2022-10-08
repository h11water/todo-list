import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid"
import "./style.css"

const LOCAL_STORAGE_KEY = "todoApp.todos"

//https://www.youtube.com/watch?v=hQAHSlTtcmY
function App() {
  //const [todos, setTodos] = useState([{name:"todo1", id:1,complete:false}, {name:"todo2", id:2,complete:true}])
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos.length > 0) {
      setTodos(storedTodos)
    }

  }, [])

  useEffect(() => {
    console.log("saved to local", todos)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleMarkComplete(id) {
    setTodos(todos => {
      //copy the todos into a new object
      let newTodos = JSON.parse(JSON.stringify(todos))
      let completedTodo = newTodos.find(todo => todo.id === id)
      completedTodo.complete = !completedTodo.complete
      return newTodos
    })
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === "") return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodo(e) {
    //console.log(todos.filter(p => {return p.complete === false}))

    setTodos(prevTodos => {
      return prevTodos.filter(p => { return p.complete === false })
    })

    //setTodos([])
  }

  function logTodos() {
    console.log(todos)
  }

  return (
    <>
      <div className="background">

        <div className="container">
          <TodoList todos={todos} handleMarkComplete={handleMarkComplete} />
          <input ref={todoNameRef} className="todoInput" type="text" placeholder="Enter New To-do" />
          <br></br>
          <button onClick={handleAddTodo}>Add Todo </button>
          <button onClick={handleClearTodo}>Clear Completed</button>

          <div>{todos.length} left to do</div>
          <button onClick={logTodos}> log</button>
        </div>


      </div>


    </>
  )
}

export default App;
