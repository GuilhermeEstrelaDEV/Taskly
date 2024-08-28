import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import Calendarcomponent from "./components/calendar";

const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("🟡 Baixa");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      console.log("Tarefas carregadas do localStorage:", parsedTasks);
      setTasks(parsedTasks);
    } else {
      console.log("Nenhuma tarefa salva encontrada");
    }
  }, []);

  useEffect(() => {
    console.log("Salvando tarefas:", tasks);
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);
  const addtask = () => {
    if (newTask === "" || dueDate === "") return;

    const newTaskItem = {
      title: newTask,
      dueDate: dueDate,
      priority: priority,
    };

    setTasks([...tasks, newTaskItem]);
    setNewTask("");
    setDueDate("");
    setPriority("🟡 Baixa");
  };

  const FinishTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h2>TASKLY</h2>

      <div className="row mt-4">
        <div className="col-md-8">
          <h3 className="text-center">Nova Tarefa</h3>
          <div className="mb-3">
            <label htmlFor="taskTitle" className="form-label">
              Título da Tarefa
            </label>
            <input
              type="text"
              className="form-control"
              id="taskTitle"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">
              Data de Entrega
            </label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Prioridade
            </label>
            <select
              className="form-select"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="🟡 Baixa">🟡 Baixa</option>
              <option value="🟢 Moderada">🟢 Moderada</option>
              <option value="🟠 Alta">🟠 Alta</option>
              <option value="🔴 Urgencia">🔴 Urgencia</option>
            </select>
          </div>
          <button type="button" className="btn btn-primary" onClick={addtask}>
            Adicionar Tarefa
          </button>
        </div>

        <div className="d-flex justify-content-center align-items-center col-md-4">
          <div>
            <Calendarcomponent />
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <h3>Tarefas</h3>
          <table className="text-center table">
            <thead>
              <tr>
                <th scope="col">Tarefa</th>
                <th scope="col">Data de Entrega</th>
                <th scope="col">Prioridade</th>
                <th scope="col">Finalizar</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.title}</td>
                  <td>{formatDate(task.dueDate)}</td>
                  <td>{task.priority}</td>
                  <td>
                    <button className="btn btn-success" onClick={() => FinishTask(index)}>
                      Finalizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
