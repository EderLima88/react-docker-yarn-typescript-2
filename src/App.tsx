import { useState } from 'react'
import Todo from "./components/Todo"
import "./App.css"
import TodoForm from './components/TodoForm'
import Search from './components/Search'
import Filter from './components/Filter'
function App() {
  const [todos, setTodos] = useState([
{
    id: 1,
    text: "Criar trabalho",
    category: "Trabalho",
    isComplete: false
},
   {
    id: 2,
    text: "Passear",
    category: "Pessoal",
    isComplete: false
  }
  ])

  const [search, setSearch] = useState("")

  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("Asc")

  const addTodo = (text: any, category: any) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isComplete: false
      }
    ]
    setTodos(newTodos);

  }

  const removeTodo = (id: number) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    )
      setTodos(filteredTodos)
  }

  const completeTodo = (id: number) => {
    const newTodos = [...todos]
    newTodos.map((todo) =>
    todo.id === id ? (todo.isComplete = !todo.isComplete) : todo 
    )
    setTodos(newTodos)
  }

  return (
    <div className='app'>
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch}/>
      <Filter filter={Filter} setFilter={setFilter} setSort={setSort}/>
      <div className="todo-list">
        {todos
        .filter((todo) => filter === "All" 
          ? true 
          : filter === "Complete" 
          ? todo.isComplete
          : !todo.isComplete)
        .filter((todo) => 
          todo.text.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
          sort === "Asc"
          ? a.text.localeCompare(b.text)
          : b.text.localeCompare(a.text)
        )
        .map((todo) => (
          <Todo 
          key={todo.id} 
          todo = {todo} 
          removeTodo={removeTodo} 
          completeTodo={completeTodo} />
        ))}
      </div>
      <TodoForm addTodo={addTodo}/>
    </div>
  )
}

export default App
