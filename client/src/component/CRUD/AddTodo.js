import React from "react";


function AddTodo({
    api_base,
    setTodos,
    todos,
    popupActive,
    setPopupActive,
    newTodo,
    setNewTodo,

}) {
    const addTodo = async () => {
        const data = await fetch(api_base + "/todo/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo
                // Name: newTodo
                // Degree: newTodo
                // University: newTodo
            })
        }).then(res => res.json());
        console.log("Data is :", data)
        setTodos([...todos, data]);

        setPopupActive(false);
        setNewTodo("");
    }
    return (
        <div className={`modal-overlay ${popupActive ? 'active' : ''}`} >
            <div className="popup">
                <div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
                <div className="content">
                    <h3>Add Task</h3>
                    <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
                    <div className="button" onClick={addTodo}>Create Task</div>
                </div>
            </div>
        </div>)
}
export default AddTodo;
