import { useEffect, useReducer, useState } from 'react';
import { FaPlus, FaCheck, FaTrash, FaEdit, FaRegTimesCircle } from "react-icons/fa";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slide from './component/Slide';
import slidesReducer from './component/Carousel';
import initialState from './component/Carousel';
import AddTodo from './component/CRUD/AddTodo';
import Card from './component/Layout/card';
// import { useMediaQuery } from "react-responsive";
const api_base = 'http://127.0.0.1:3001';

function App() {
	const [state, dispatch] = useReducer(slidesReducer, initialState);
	const slides = [
		{
			title: "Machu Picchu",
			subtitle: "Peru",
			description: "Adventure is never far away",
			image:
				"https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
		},
		{
			title: "Chamonix",
			subtitle: "France",
			description: "Let your dreams come true",
			image:
				"https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
		},
		{
			title: "Mimisa Rocks",
			subtitle: "Australia",
			description: "A piece of heaven",
			image:
				"https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
		},
		{
			title: "Four",
			subtitle: "Australia",
			description: "A piece of heaven",
			image:
				"https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
		},
		{
			title: "Five",
			subtitle: "Australia",
			description: "A piece of heaven",
			image:
				"https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
		}
	];




	const [todos, setTodos] = useState([]);
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [degree, setDegree] = useState("");
	const [university, setUniversity] = useState("");
	const [popupActive, setPopupActive] = useState(false);
	const [editValue, setEditValue] = useState("");
	const [newTodo, setNewTodo] = useState("");
	const [EditMode, setEditMode] = useState(false);
	const [darkMode, setdarkMode] = useState(false);

	useEffect(() => {
		getTodos();
	}, []);

	const getTodos = async () => {
		const data = await fetch(api_base + '/todos/').then(res => res.json());

		console.log("Array Found : ", data);
		setTodos(data);
		console.log("Todo is :  : ", todos);
	};

	const editUser = async (id) => {
		console.log("Id is : ", id);
		const data = await fetch(api_base + '/todos/' + id).then(res => res.json());
		console.log("Data is : ", data);
		setEditMode(!EditMode);
		setId(id);
		setPopupActive(true);
		setEditValue(data.text);
		setName(data.Name);
		setDegree(data.Degree);
		setUniversity(data.text)
	};

	const handleToggle = () => {
		var element = document.body;
		setdarkMode(!darkMode)
		element.classList.toggle("dark-mode");
	}

	return (
		<div className="App">
			<label className="switch">
				<input type="checkbox" onClick={handleToggle} />
				<span className="slider round"></span>
			</label>
			<div className='card_data'>
				{todos.length > 0 ? (
					todos.map((todo, index) => (
						<Card
							darkMode={darkMode}
							setdarkMode={setdarkMode}
							api_base={api_base}
							popupActive={popupActive}
							setPopupActive={setPopupActive}
							todo={todo}
							index={index}
							setUniversity={setUniversity}
							setDegree={setDegree}
							setName={setName}
							setEditValue={setEditValue}
							editUser={editUser}
							setTodos={setTodos}
						/>
					))
				) : ''
				}
			</div>
			{/* <h1>Welcome</h1>
			<h4>Your tasks</h4>
			<div className="">
				{todos.length > 0 ? todos.map(todo => (
					<div className={"todo" + (todo.complete ? " is-complete" : "")} >
						<div style={{ margin: '0px 10px' }} key={todo._id} onClick={() => completeTodo(todo._id)}> <FaCheck></FaCheck></div>

						<div className="text">{todo.text}</div>

						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}><FaTrash></FaTrash></div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div> */}

			<div className="addPopup" onClick={() => setPopupActive(true)}><FaPlus></FaPlus></div>

			{/* <div>
				<button onClick={handleShowModal}>Open Modal</button>
				<AddModal show={showModal} handleClose={handleCloseModal} />
			</div> */}

			{
				popupActive ? (
					<AddTodo
						EditMode={EditMode}
						setEditMode={setEditMode}
						id={id}
						setId={setId}
						api_base={api_base}
						setTodos={setTodos}
						todos={todos}
						setEditValue={setEditValue}
						popupActive={popupActive} // Pass popupActive here
						setPopupActive={setPopupActive}
						newTodo={newTodo} // Pass newTodo here
						setNewTodo={setNewTodo}
						name={name}
						degree={degree}
						university={university}
						editValue={editValue}
						setName={setName}
						setDegree={setDegree}
						setUniversity={setUniversity}
					/>
				) : ''
			}
		</div >
	);
}

export default App;