import React from 'react';
import "./styles.css";

export default function App() {
    // useState is a hook to place initial values, and define function to set values
    const [todos, setTodos] = React.useState([
        {id: 1, text: "Wash dishes", done: false},
        {id: 2, text: "Do laundry", done: false},
        {id: 3, text: "Take shower", done: false}
    ])

    return (
        <div>
            <h1>Todo List</h1>

            <TodoList todos={todos} setTodos={setTodos}/>
            <AddTodo setTodos={ setTodos }/>
        </div>
    );
}

// using object destructuring on the props object
function TodoList({ todos, setTodos }) {
    function handleToogleTodo(todo) {
        const updatedTodos = todos.map((t) =>
            t.id === todo.id
                ? {
                    ...t,
                    done: !t.done
                } : t);
        setTodos(updatedTodos)
    }

    if (!todos.length) {
        return <p>No todos left!</p>;
    }

    return (
        <ul>
            {todos.map(todo => (
                <li
                onDoubleClick={() => handleToogleTodo(todo)} 
                style={{
                    textDecoration: todo.done ? 'line-through' : ""
                }}
                key={todo.id}>{todo.text}
                <DeleteTodo todo={todo} setTodos={setTodos} />
                </li>
            ))}
        </ul>
    )
}

function DeleteTodo({todo, setTodos}) {
    function handleDeleteTodo() {
        const confirmed = window.confirm("Do you want to delete this?");
        if (confirmed) {
            setTodos((prevTodos) => {
                return prevTodos.filter((t) => t.id !== todo.id);
            }); 
        }
    }
    return (
        <span
            onClick={handleDeleteTodo}
            role="button" 
            style={{
            color: 'red',
            fontWeight: 'bold',
            marginLeft: 10,
        }}>x</span>
    )
}

function AddTodo({ setTodos }) {
    const inputRef = React.useRef();

    function handleAddTodo(event) {
        event.preventDefault();
        const text = event.target.elements.addTodo.value;
        const todo = {
            id: Math.random(),
            text,
            done: false
        };
        setTodos( prevTodos => {
            return prevTodos.concat(todo)
        })
        inputRef.current.value = "";
    }
    return(
        <form onSubmit={handleAddTodo}>
            <input name="addTodo" placeholder="Add todo" ref={inputRef}/>
            <button type="submit">Submit</button>
        </form>
    );
}

