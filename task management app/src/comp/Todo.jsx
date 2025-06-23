import React, { useEffect, useRef, useState } from "react";
import TodoCss from "./todo.module.css";
import { toast } from "react-hot-toast";

const Todo = () => {
  const taskData = JSON.parse(localStorage.getItem("todo")) || [
    { task: "Buy Bike", complete: false },
    { task: "Buy Phone", complete: true },
  ];

  const [alldata, setAllData] = useState(taskData);
  const [todoTask, setTodoTask] = useState("");
  const [search, setSearch] = useState("");
  const [completeTask, setCtask] = useState(0);
  const [remainingTask, setRtask] = useState(0);
  const BgColor = useRef();
  const Button = useRef();

  function handleForm(e) {
    e.preventDefault();
    console.log({ task: todoTask });
    const myTask = todoTask.trim();

    if (!myTask) {
      toast.error("Please add task ", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      const isVerified = alldata.some((value, index) => {
        return value.task.toLowerCase() === todoTask.toLowerCase();
      });

      if (isVerified) {
        toast.error("Task Already Added.. ", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setTodoTask("");
      } else {
        setAllData([...alldata, { task: todoTask, complete: false }]);
        toast.success("Task Added..😍");
        setTodoTask("");
      }
    }
  }

  function handleDelete(id) {
    const copyOfAlldata = [...alldata];
    const filterdValue = copyOfAlldata.filter((value, index) => {
      return index !== id;
    });

    if (filterdValue) {
      const taskDelete = window.confirm(
        "Are you sure you want to delete task 😐"
      );

      if (taskDelete) {
        setAllData(filterdValue);
      } else {
        setAllData(copyOfAlldata);
      }
    }
  }

  function handleCheckbox(id) {
    const copyOfAlldata = [...alldata];
    copyOfAlldata[id].complete = !copyOfAlldata[id].complete;
    setAllData(copyOfAlldata);
  }

  function handleClear() {
    let copyOfAlldata = [...alldata];
    copyOfAlldata = [];
    setAllData(copyOfAlldata);
  }

  function handleEdit(id) {
    console.log(id);
    const copyOfAlldata = [...alldata];
    const oldTask = copyOfAlldata[id].task;
    const newTask = prompt(`Update Task :- ${oldTask}`, oldTask);
    const newObj = { task: newTask, complete: false };

    copyOfAlldata.splice(id, 1, newObj);
    setAllData(copyOfAlldata);
  }

  const filterTask = alldata.filter((itmes) => {
    return itmes.task.toLocaleLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    const copyOfAlldata = [...alldata];
    const allCompleteTask = copyOfAlldata.filter((value) => {
      return value.complete;
    });

    setCtask(allCompleteTask.length);

    const allRemaningTask = copyOfAlldata.filter((value) => {
      return !value.complete;
    });

    setRtask(allRemaningTask.length);

    localStorage.setItem("todo", JSON.stringify(copyOfAlldata));
  }, [alldata]);

  function handleDarkMode() {
    const bodyBg = BgColor.current.style.backgroundColor;

    if (bodyBg === "" || bodyBg === "white") {
      BgColor.current.style.backgroundColor = "black";
      BgColor.current.style.color = "white";
      Button.current.className = "bi bi-toggle-on";
    } else {
      BgColor.current.style.backgroundColor = "white";
      BgColor.current.style.color = "black";
      Button.current.className = "bi bi-toggle-off";
    }
  }

  return (
    <div ref={BgColor}>
      <div className={TodoCss.main}>
        {/* Search bar */}

        <h1>
          Todo-App 🧾{" "}
          <i
            className="bi bi-toggle-off"
            ref={Button}
            onClick={handleDarkMode}
          ></i>
        </h1>

        <div className={TodoCss.task}>
          <form action="" onSubmit={handleForm}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Add task here ..."
              className="form-control"
              value={todoTask}
              onChange={(e) => {
                setTodoTask(e.target.value);
              }}
            />
            {/* Search */}
            <input
              type="search"
              name=""
              id=""
              className="form-control mt-3"
              placeholder="Saerch Task Here ✨"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button type="submit" className="form-control btn btn-success mt-3">
              Add
            </button>
          </form>
          {filterTask.length === 0 ? (
            <h3 className="text-center text-danger">No Matching Result..🔍</h3>
          ) : (
            filterTask.map((itmes, index) => (
              <div key={index} className={TodoCss.alltask}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className={TodoCss.checkbox}
                  checked={itmes.complete}
                  onClick={() => {
                    handleCheckbox(index);
                  }}
                />
                <span
                  style={{
                    textDecoration: itmes.complete ? "line-through red" : "",
                  }}
                >
                  {itmes.task}
                </span>
                <i
                  className="bi bi-x-circle text-danger float-end mx-2"
                  onClick={() => {
                    handleDelete(index);
                  }}
                ></i>
                <i
                  className="bi bi-pencil-square text-success float-end mx-2"
                  onClick={() => {
                    handleEdit(index);
                  }}
                ></i>
              </div>
            ))
          )}
          <button
            className="btn btn-outline-danger form-control mt-4"
            onClick={handleClear}
          >
            All Clear 🫧
          </button>
        </div>
        <span className="fw-bold mt-1">Completed Task :- {completeTask} </span>
        <span className="fw-bold mt-1">Remainig Task :- {remainingTask} </span>
      </div>
    </div>
  );
};

export default Todo;
