import { useEffect, useState } from "react"
import { TodoProvider } from "../context"
import { TodoItem , TodoForm } from "../components"

function App() {
const [todos, setTodos] = useState([]) //empty array of todos   
              //this todo is from the context
const addTodo = (todo) => {
  // setTodos(todo) //this will replace the existing todos with the new todo

  setTodos((prev) => [{
    // id: Date.now(),
    ...todo,
    // completed: false,
   },
   ...prev])
}

const updateTodo = (todo, id) => {
    //loop through the todos and find the todo with the id to edit
                    //each todoObject is a single todo object //prev is the previous state state of todos hook
    setTodos((prev) => prev.map((todoObject) => 
      (todoObject.id === id ?  todo  :  todoObject    )) )
}               //on matching ids, update with new todo received from function , else return the todoObjects as it is

const deleteTodo = (id) => {
  setTodos((prev) => prev.filter((todoObject) => todoObject.id !== id))   //filter out the todo with the id to delete
} 

const toggleComplete = (id) => {
    setTodos((prev) => prev.map((todoObject) =>
      todoObject.id === id 
      //  ? todoObject.completed = !todoObject.completed The second approach is incorrect because it mutates the existing state directly. 
      ? {...todoObject, completed : !todoObject.completed }
       : todoObject
      )
    )
}

  useEffect( () => {
   const todo = JSON.parse(localStorage.getItem("todos"))

   if(todo && todo.length > 0)
    setTodos(todo);
  }, [])
  //to set todo when browser renders

  useEffect( () => {

   localStorage.setItem("todos", JSON.stringify(todos)) //("key", "value")
  } , [todos]) //whenvers state of todos change, local storage is updated


  return (
    <TodoProvider value = {{todos, addTodo, deleteTodo, updateTodo, toggleComplete}} >
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                         {/* Curly brackets to write js in html */}
                          {
                            todos.map( (todo) => (
                              <div
                              key = {todo.id}
                              className="w-full">

                              <TodoItem  todo={todo}/>

                              </div>
                            ))  //() after an arrow function auto returns
                          }
                            {/* <TodoItem todo={todo} /> */}
                          </div>
                        
                    </div>
                </div>
      </TodoProvider> 
  )
}

export default App
