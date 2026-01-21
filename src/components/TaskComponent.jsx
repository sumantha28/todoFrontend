import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './TaskComponent.css'

const TaskComponent = () => {
  const [tasks, setTasks] = useState([])

  const [inputValue, setInputValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')

   const fetchTasks = async () => {
        try {
        const response = await axios.get('http://localhost:9000/task');
        setTasks(response.data);
        } catch (error) {
        console.error('Error fetching tasks:', error);
        }
   };

   const createTask = async () => {
        try {
        await axios.post('http://localhost:9000/task', {
            taskName: inputValue,
            taskDesc: descriptionValue
        });
        
        alert('Task Added Successfully');
        fetchTasks();
        } catch (error) {
        console.error('Error fetching tasks:', error);
        }
   };

    useEffect(() => {
        fetchTasks();
    }, []);

  const handleAddTask = () => {
    if (inputValue.trim()) {
      createTask();
      setInputValue('')
      setDescriptionValue('')
    }
  }

  const handleDeleteTask = async (id) => {
    try {
        await axios.delete(`http://localhost:9000/task/${id}`);
        
        alert('Task Deleted Successfully');
        fetchTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
  }

  return (
    <div className="task-container">
      <header className="task-header">
        <h1>📝 Task Manager</h1>
        <p>Organize and track your daily tasks</p>
      </header>

      <div className="task-input-section">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            className="task-input"
          />
          <input
            type="textarea"
            placeholder="Enter task description..."
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            className="task-input"
          />
          <button onClick={handleAddTask} className="btn-add">+ Add Task</button>
        </div>
      </div>

      <div className="task-list-section">
        <h2>Your Tasks ({tasks.length})</h2>
        {tasks.length === 0 ? (
          <p className="empty-message">No tasks yet. Add one to get started! 🎯</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="task-item">
                <div className="task-content">
                  <h3 className="task-title">{task.TaskName}</h3>
                  <p className="task-description">{task.TaskDescription}</p>
                </div>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="btn-delete"
                  title="Delete task"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default TaskComponent