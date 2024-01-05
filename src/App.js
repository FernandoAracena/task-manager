// src/App.js
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './AppStyles.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/tasks'); 
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed: false }),
      });
      const newTask = await response.json();
      // Update state by providing a function to setTasks
    setTasks(prevTasks => [...prevTasks, newTask]);
  } catch (error) {
    console.error('Error adding task:', error);
  }
  };

  const updateTask = async (id, title) => {
    const response = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, title, completed: false }),
    });
    const updatedTask = await response.json();
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className='Manager'>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      {tasks !== null && tasks !== undefined ? (
        <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
      ) : (
        <p>Waiting for tasks...</p>
      )}
    </div>
  );
}

export default App;
