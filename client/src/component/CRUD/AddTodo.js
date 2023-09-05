import React, { useState, useEffect } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

function AddTodo({
    id,
    api_base,
    setTodos,
    todos,
    popupActive,
    setPopupActive,
    name,
    degree,
    university,
    editValue,
    setName,
    setDegree,
    setUniversity,
    setEditValue,
    EditMode,
    setEditMode
}) {
    const [newTodo, setNewTodo] = useState(editValue);
    // const [name, setName] = useState("");
    // const [degree, setDegree] = useState("");
    // const [university, setUniversity] = useState("");

    useEffect(() => {
        console.log(newTodo, name, degree, university)
    }, []);

    const addTodo = async () => {
        const data = await fetch(api_base + "/todo/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo,
                name: name,
                degree: degree,
                university: university
            })
        }).then(res => res.json());

        console.log("Data is:", data);
        setTodos([...todos, data]);
        setPopupActive(false);
        setEditValue("");
        setName("");
        setDegree("");
        setUniversity("");
    }
    const updateTodo = async (id) => {
        const data = await fetch(api_base + "/todo/edit/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo,
                name: name,
                degree: degree,
                university: university
            })
        }).then(res => res.json());

        console.log("Data is:", data);
        // setTodos([...todos, data]);
        setPopupActive(false);
        setNewTodo("");
        setName("");
        setDegree("");
        setUniversity("");
        setTodos(todos => todos.filter(todo => todo._id !== id));
        setTodos((todos) => todos.map((todo) => {
            if (todo._id === id) {
                todo.text = data.text;
                todo.name = data.Name;
                todo.degree = data.Degree;
                todo.university = data.University;
            }
            return todo;
        }));
    }
    const closePopup = () => {
        setPopupActive(false);
        setEditMode(false)
    }

    return (
        <div className={`modal-overlay ${popupActive ? 'active' : ''}`} >
            <div className="popup">
                <div className="closePopup" onClick={closePopup}> <FaRegTimesCircle className="Icon" /></div>
                <div className="content">
                    <h3>Add Task</h3>
                    <input type="text" className="add-todo-input" placeholder="Task" onChange={e => setNewTodo(e.target.value)} hidden value={id} />
                    {EditMode ?
                        <input type="text" className="add-todo-input" placeholder="Task" onChange={e => setEditValue(e.target.value)} value={editValue} />
                        : <input type="text" className="add-todo-input" placeholder="Task" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
                    }
                    <input type="text" className="add-todo-input" placeholder="Name" onChange={e => setName(e.target.value)} value={name} />
                    <input type="text" className="add-todo-input" placeholder="Degree" onChange={e => setDegree(e.target.value)} value={degree} />
                    <input type="text" className="add-todo-input" placeholder="University" onChange={e => setUniversity(e.target.value)} value={university} />

                    <div className="button" onClick={() => EditMode ? updateTodo(id) : addTodo()} >{EditMode ? 'Update' : 'Create'}</div>
                </div>
            </div>
        </div>
    );
}

export default AddTodo;
