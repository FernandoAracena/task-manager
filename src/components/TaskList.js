// src/components/TaskList.js
import React, { useState } from 'react';
import '../AppStyles.css';


function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  const [editableTasks, setEditableTasks] = useState({});

  const handleEditClick = (id, title) => {
    setEditableTasks((prevEditableTasks) => ({
      ...prevEditableTasks,
      [id]: title,
    }));
  };

  const handleSaveClick = (id) => {
    onUpdateTask(id, editableTasks[id]);
    setEditableTasks((prevEditableTasks) => {
      const { [id]: _, ...rest } = prevEditableTasks;
      return rest;
    });
  };

  const handleInputChange = (id, value) => {
    setEditableTasks((prevEditableTasks) => ({
      ...prevEditableTasks,
      [id]: value,
    }));
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {editableTasks[task.id] !== undefined ? (
            <>
              <input
                type="text"
                value={editableTasks[task.id]}
                onChange={(e) => handleInputChange(task.id, e.target.value)}
              />
              <button onClick={() => handleSaveClick(task.id)}>Save</button>
            </>
          ) : (
            <>
              <span>{task.title}</span>
              <button className="edit" onClick={() => handleEditClick(task.id, task.title)}>Edit</button>
              <button className="delete" onClick={() => onDeleteTask(task.id)}>Done</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
