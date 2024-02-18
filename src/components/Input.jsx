import { useState } from "react"

function Input({ onAddTask }) {
  const [description, setDescription] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    if (!description) return

    const newTask = { description, completed: false, id: Date.now() }

    onAddTask(newTask)

    setDescription("")
  }

  return (
    <div className='new-task'>
      <form onSubmit={handleSubmit}>
        <span className='new-task-icon'></span>
        <input
          type='text'
          placeholder='Add a new task...'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
    </div>
  )
}

export default Input
