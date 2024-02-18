import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function TaskItem({ id, task, onToggleCompleted }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <li ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <input
        className='checkbox'
        type='checkbox'
        value={task.completed}
        defaultChecked={task.completed}
        onChange={() => onToggleCompleted(task.id)}
      />
      <label htmlFor='checkbox'></label>

      <p className={task.completed ? "strike" : ""}>{task.description}</p>
    </li>
  )
}

export default TaskItem
