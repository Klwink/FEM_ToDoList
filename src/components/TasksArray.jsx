import { useState } from "react"
import TaskItem from "./TaskItem"

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

function TasksArray({ tasks, onToggleCompleted, onClearCompleted }) {
  const [sortBy, setSortBy] = useState("all")

  let filteredTasks

  if (sortBy === "all") filteredTasks = tasks

  if (sortBy === "active")
    filteredTasks = tasks.filter((task) => !task.completed)

  if (sortBy === "completed")
    filteredTasks = tasks.filter((task) => task.completed)

  const numCompleted = tasks.filter((task) => task.completed).length
  const itemsLeft = tasks.length - numCompleted

  return (
    <div className='task-container'>
      <ul>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {filteredTasks.map((task) => (
            <TaskItem
              task={task}
              onToggleCompleted={onToggleCompleted}
              id={task.id}
              key={task.id}
            />
          ))}
        </SortableContext>
      </ul>
      <div className='summary-container'>
        {itemsLeft} items left
        <form>
          <label className={sortBy === "all" ? "filter-active" : ""}>
            <input
              value='all'
              type='radio'
              onChange={(e) => setSortBy(e.target.value)}
            />{" "}
            All
          </label>
          <label
            className={sortBy === "active" ? "filter-active" : "filter-btn"}
          >
            <input
              value='active'
              type='radio'
              onChange={(e) => setSortBy(e.target.value)}
            />{" "}
            Active
          </label>
          <label
            className={sortBy === "completed" ? "filter-active" : "filter-btn"}
          >
            <input
              value='completed'
              type='radio'
              onChange={(e) => setSortBy(e.target.value)}
            />{" "}
            Completed
          </label>
        </form>
        <span onClick={() => onClearCompleted()}>Clear Completed</span>
      </div>
    </div>
  )
}

export default TasksArray
