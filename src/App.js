import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid"
import "./style.css"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompletedTodo from "./CompletedTodo";

const LOCAL_STORAGE_KEY = "todoApp.todos"
const LOCAL_STORAGE_KEY_COMPLETED = "todoApp.complete"

function App() {
  //const [todos, setTodos] = useState([{name:"todo1", id:1,complete:false}, {name:"todo2", id:2,complete:true}])
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const todoNameRef = useRef()


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    //console.log(typeof(storedTodos), storedTodos)
    if (
      storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos)
    }
    const storedCompletedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_COMPLETED))
    if (storedCompletedTodos && storedCompletedTodos.length > 0) {
      setCompletedTodos(storedCompletedTodos)
    }

  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_COMPLETED, JSON.stringify(completedTodos))
  }, [completedTodos])

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
    //if the todo contains nothing, dont add it 
    if (name === "") return
    console.log(name)
    //append the todo
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false, dateAdded: new Date() }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodo(e) {
    //console.log(todos.filter(p => {return p.complete === false}))

    console.log(todos.filter(t => { return t.complete === true }))


    //add the completed todo the the completed storage
    //also add the date completed to the todo
    setCompletedTodos(prevCompleted =>{
      let completedTs = todos.filter(t=>{return t.complete === true})
      completedTs.map(t=>{t.dateCompleted = new Date(); return t})
      console.log(completedTs)
      return [...prevCompleted, ...completedTs]
    })

    setTodos(prevTodos => {

      return prevTodos.filter(p => { return p.complete === false })
    })

    //setTodos([])
  }


  function handleInputEnter(e) {
    if (e.key === "Enter") {
      handleAddTodo()
    }
  }

  function switchCompleteAndIncompleteTab() {
    //switch the completed and incomplete tabs

    let completedTab = document.getElementById("completedContainer")
    completedTab.classList.toggle("slide-left")
    let incompletedTab = document.getElementById("incompleteContainer")
    incompletedTab.classList.toggle("slide-right")
    let rs = getComputedStyle(document.querySelector(':root'))

    //* 1000 to get milliseconds
    let tabSwitchTime = rs.getPropertyValue('--tabSwitchTime').replace("s", "") * 1000

    //switch the tabs z index
    setTimeout(() => {
      [completedTab.style.zIndex, incompletedTab.style.zIndex] = [incompletedTab.style.zIndex, completedTab.style.zIndex]
    }, tabSwitchTime)

    //make the tabs move back to their original positions
    setTimeout(() => {
      completedTab.classList.toggle("slide-left")
      incompletedTab.classList.toggle("slide-right")
    }, tabSwitchTime + 80);

  }

  return (
    <>
      <div className="background">

        <h1 style={{ textDecoration: "underline" }}>Todo List:</h1>

        <div id="incompleteContainer" className="Mycontainer" style={{ zIndex: 2 }}>
          <div style={{ textAlign: "right", marginRight: ".5em", color: "white" }}>{todos.filter(t => !t.complete).length} left to do</div>
          <TodoList todos={todos} handleMarkComplete={handleMarkComplete} listType={"incomplete"} />


          <input ref={todoNameRef} className="todoInput" type="text" placeholder="Enter New To-do" onKeyDown={(e) => handleInputEnter(e)} />


          <br></br>
          <Button className="btn-light" onClick={handleAddTodo}>Add Todo 📝</Button>
          <Button className="btn-light" onClick={handleClearTodo}>Clear Completed ✔️</Button>
          <br></br>
          <Button onClick={switchCompleteAndIncompleteTab}></Button>

          {/*<button onClick={logTodos}> log</button>*/}
        </div>

        <div id="completedContainer" className="Mycontainer" style={{ backgroundColor: "greenyellow", position: "absolute", zIndex: 1, height: "500px" }}>
          <TodoList todos={completedTodos} handleMarkComplete={handleMarkComplete} listType={"complete"} />
        </div>


      </div>


    </>
  )
}

export default App;
