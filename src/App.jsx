import { useState } from 'react'
import './App.css'

function App() {

  // Define two state variables: `toDoList` will hold an array of to-do items, 
  // and `toDo` will hold the user's input as they type a new to-do item
  const [toDoList, setToDoList] = useState([])
  const [toDo, setToDo] = useState('')


  // This function is called whenever the user types in the input field for a new to-do item.
  // It updates the `toDo` state variable to hold the current value of the input field.
  const handleInputChange = (e) => {setToDo(e.target.value)}

  // This function is called when the user clicks the "Add" button to add a new to-do item.
  // It creates a new to-do object with a unique ID, the user's input as the content,
  // and sets the `isDone` property to false (because the to-do has not yet been completed).
  // The new to-do object is added to the `toDoList` array using the `setToDoList` function,
  // and the `toDo` state variable is reset to an empty string.
  const handleAdd = () => {
    const newToDo = {
      id: toDoList.length + 1,
      content: toDo,
      isDone: false
    }
    setToDoList([...toDoList, newToDo])
    setToDo('')
  }

  // This function is called when the user clicks the "Delete" button next to a to-do item.
  // It filters the `toDoList` array to remove the to-do with the given `id`, and updates
  // the `toDoList` state variable with the new array that does not include the deleted to-do.
  const handleDelete = (id) => {
    const newToDoList = toDoList.filter((todo) => todo.id !== id)
    setToDoList(newToDoList)
  }

  // This function is called when the user clicks the "Done" button next to a to-do item.
  // It finds the to-do with the given `id` in the `toDoList` array and sets its `isDone`
  // property to `true`, indicating that the to-do has been completed.
  // The updated `toDoList` array is then sorted so that completed to-do items appear
  // at the bottom of the list, and the new array is set as the `toDoList` state variable.
  const handleDone = (id) => {
    const newToDoList = toDoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: true
        }
      }
      return todo
    })

    const sorted = newToDoList.sort((a, b) => {
      if (a.isDone === b.isDone) return 0
      if (a.isDone) return 1
      return -1
    })
    setToDoList(sorted)
  }

  // These two variables define styles for to-do items that have been completed
  // and those that have not yet been completed, respectively.
  const toDoDoneStyle = {
    textDecoration: 'line-through',
    color: '#8b8b8b'
  }
  const toDoNotDoneStyle = {
    textDecoration: 'none',
  }
  return (
    <div className="App">
      <div className='todo_add'>
        <input type="text" value={toDo} onChange={handleInputChange} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className='todo_list'>
        {toDoList.map((todo) => (
          <div key={todo.id}>
            <span style={todo.isDone ? toDoDoneStyle : toDoNotDoneStyle}>{todo.content}</span>
            <div className='todo_actions'> 
            <button onClick={() => handleDone(todo.id)}>Done</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default App
