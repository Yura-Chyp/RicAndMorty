import React, { useEffect, useState } from 'react';
import './WatchList.css'; 

export default function WatchList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
        },
      ]);
      setNewTask(''); 
    }
  };

  const removeTask = (taskID) => {
    setTasks(tasks.filter((task) => task.id !== taskID));
  };

  const toggleComplete = (taskID) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskID ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="watchlist-container">
      <h1>Watch List</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Add new episodes"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
        />
        <button onClick={addTask} className='he
        '>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span className={task.completed ? 'completed' : 'not-completed'}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
