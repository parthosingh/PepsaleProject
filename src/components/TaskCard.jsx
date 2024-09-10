// src/components/TaskCard.jsx
import React, { useState } from "react";

import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";

const TaskCard = ({ title, tags, handleDelete, index, setActiveCard, handleEdit, history }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(title);

  const saveEdit = () => {
    handleEdit(index, newTask);
    setIsEditing(false);
  };

  return (
    <article
      className="task_card"
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="edit_input"
          />
          <button onClick={saveEdit} className="save_button">Save</button>
        </div>
      ) : (
        <p className="task_text">{title}</p>
      )}

      <div className="task_card_bottom_line">
        <div className="task_card_tags">
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected />
          ))}
        </div>
        <div className="task_actions">
          <button onClick={() => setIsEditing(true)} className="edit_button">
            Edit
          </button>
          <div className="task_delete" onClick={() => handleDelete(index)}>
            <img src={deleteIcon} className="delete_icon" alt="Delete" />
          </div>
        </div>
      </div>
      <div className="task_history">
        <strong>History:</strong>
        <ul>
          {history?.map((item, i) => (
            <li key={i}>
              {item.action} at {item.time}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default TaskCard;
