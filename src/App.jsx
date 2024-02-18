import { useState } from "react"

import "./App.css"
import Header from "./components/Header"
import TasksArray from "./components/TasksArray"
import Input from "./components/Input"
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"

const data = [
  { id: 1, description: "Complete online JavaScript course", completed: true },
  { id: 2, description: "Jog around the park 3x", completed: false },
  {
    id: 3,
    description: "Read for 1 hour",
    completed: false,
  },
  { id: 4, description: "Pick up grocieries", completed: false },
  {
    id: 5,
    description: "Complete Todo App on Frontend Mentor",
    completed: false,
  },
]

function App() {
  const [lightTheme, setLightTheme] = useState(false)
  const [tasks, setTasks] = useState(data)

  function toggleTheme() {
    setLightTheme((prevTheme) => !prevTheme)
  }

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task])
  }

  function handleToggleCompleted(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function handleClearCompleted() {
    setTasks(tasks.filter((task) => !task.completed))
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id)

  // keeps drag /drop in the position it is sent to
  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id === over.id) return

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id)
      const newPos = getTaskPos(over.id)

      return arrayMove(tasks, originalPos, newPos)
    })
  }

  return (
    <div className={`${lightTheme ? "light-theme" : ""} app`}>
      <Header lightTheme={lightTheme} onToggleTheme={toggleTheme} />
      <div className='container'>
        <Input onAddTask={handleAddTask} />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <TasksArray
            tasks={tasks}
            onToggleCompleted={handleToggleCompleted}
            onClearCompleted={handleClearCompleted}
          />
        </DndContext>
      </div>
      <div className='dnd'>Drag and drop to reorder list</div>
    </div>
  )
}

export default App
