// src/components/TaskForm.jsx
import React, { useState } from "react";
import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({ setTasks, editMode, taskToEdit, saveTask }) => {
  const [taskData, setTaskData] = useState(
    taskToEdit || {
      task: "",
      status: "todo",
      tags: [],
      history: [],
    }
  );

  const checkTag = (tag) => taskData.tags.includes(tag);

  const selectTag = (tag) => {
    setTaskData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      saveTask(taskData); // Save edited task
    } else {
      const timestamp = new Date().toLocaleString();
      const newTask = { ...taskData, history: [`Created on ${timestamp}`] };
      setTasks((prev) => [...prev, newTask]);
    }
    resetForm();
  };

  const resetForm = () => {
    setTaskData({ task: "", status: "todo", tags: [], history: [] });
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="task_input"
          placeholder="Enter your task"
          onChange={handleChange}
        />
        <div className="task_form_bottom_line">
          <div>
            {["HTML", "CSS", "JavaScript", "React"].map((tag) => (
              <Tag key={tag} tagName={tag} selectTag={selectTag} selected={checkTag(tag)} />
            ))}
          </div>
          <div>
            <select name="status" value={taskData.status} className="task_status" onChange={handleChange}>
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button type="submit" className="task_submit">
              {editMode ? "Save Task" : "+ Add Task"}
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
