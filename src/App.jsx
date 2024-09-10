// src/App.jsx
import React, { useState, useEffect } from "react";

import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const onDrop = (status, position) => {
    console.log(
      `${activeCard} is going to be placed into ${status} at position ${position}`
    );

    if (activeCard == null || activeCard === undefined) return;

    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((_, index) => index !== activeCard);

    const now = new Date();
    const timeStamp = now.toLocaleString();

    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status,
      history: [
        ...(taskToMove.history || []),
        {
          action: `Moved to ${status}`,
          time: timeStamp,
        },
      ],
    });

    setTasks(updatedTasks);
  };

  const handleEdit = (index, newTask) => {
    const updatedTasks = [...tasks];
    const now = new Date();
    const timeStamp = now.toLocaleString();

    updatedTasks[index] = {
      ...updatedTasks[index],
      task: newTask,
      history: [
        ...(updatedTasks[index].history || []),
        {
          action: `Task edited`,
          time: timeStamp,
        },
      ],
    };

    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn
          title="To do"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          handleEdit={handleEdit}
        />
        <TaskColumn
          title="Doing"
          icon={doingIcon}
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          handleEdit={handleEdit}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          handleEdit={handleEdit}
        />
      </main>
    </div>
  );
};

export default App;
