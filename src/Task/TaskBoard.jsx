import React, { useState } from "react";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import AddModalTask from "./AddModalTask";
import { HiH1 } from "react-icons/hi2";

const allTask = [
  {
    id: crypto.randomUUID(),
    title: "Integration API",
    description:
      "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
    tags: ["web", "python", "api"],
    priority: "High",
    isFavourite: true,
  },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(allTask);
  const [showModalTask, setShowModalTask] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      return setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowModalTask(false);
    setTaskToUpdate(null);
    
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowModalTask(true);
  };

  const onCloseButton = () => {
    setShowModalTask(false);
    setTaskToUpdate(null);
  };

  const handleDelete = (taskId) => {
    const deleteAfterTask = tasks.filter((task) => task.id !== taskId);
    setTasks(deleteAfterTask);
  };

  const handleDeleteAll = () => {
    setTasks([]);
  };

  const handleFavouriteIcon = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFavourite: !task.isFavourite };
        } else {
          return task;
        }
      })
    );
  };

  const handleSearch = (search) => {
    const filterSearch = tasks.filter((task) =>
      task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setTasks([...filterSearch]);
  };

  return (
    <section className="mb-20" id="tasks">
      {showModalTask && (
        <AddModalTask
          handleAddEditTask={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseButton={onCloseButton}
        />
      )}
      <div className="container">
        <SearchTask handleSearch={handleSearch} />

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            handleDeleteAll={handleDeleteAll}
            handleAddTask={() => setShowModalTask(true)}
          />
          {
            tasks.length > 0 ? (
              <TaskList
            handleFavouriteIcon={handleFavouriteIcon}
            tasks={tasks}
            handleEditTask={handleEditTask}
            handleDelete={handleDelete}
          />
            ) : (<h1 className="flex justify-center items-center">no data found</h1>)
          }
        </div>
      </div>
    </section>
  );
}
