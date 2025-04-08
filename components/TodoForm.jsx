import React, { useState } from "react";
import { useTodo } from "../context";



    
function TodoForm() {
    //state for individual todos
    const [todo, setTodo ] = useState("")
    const {addTodo} = useTodo() //took addTodo todoContext

    const add = (e) => {
        e.preventDefault()

        if(!todo)
            return 
        
        addTodo( {id : Date.now(), todo , completed : false 

        } ) //because context todoholds todos as array of objects
        setTodo("") //emptying after this todo is sent to the global context todo
    }
    return ( 
        <form onSubmit={add}  className="flex">
        <input
            type="text"
            placeholder="Write Todo..."
            className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5 text-black"
            value={todo} //wire up
            onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"> 
            {/* no need of functionality on button as its type is submit so it auto submits */}
            Add
        </button>
    </form>
     );
}

export default TodoForm;