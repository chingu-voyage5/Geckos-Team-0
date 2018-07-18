import React from 'react';
import Modal from "react-modal";
import "../styles/ToDo.css";


class ToDo extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			error: undefined,
			todos: [
				'React',
				'JavaScript'
			]
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.addToDo = this.addToDo.bind(this);
		this.deleteToDo = this.deleteToDo.bind(this);
		this.strikeToDo = this.strikeToDo.bind(this);
	}

	// Modal
	handleOpenModal() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}

	// Local Storage
    componentDidMount() {
		try {
			const value = localStorage.getItem('todos');
			const options = JSON.parse(value);
		
			if (options) {
				this.setState(() => ({ 
					todos: options 
				}));
			}
		} catch (e) {
			// Do nothing
		}
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.todos !== this.state.todos.length) {
			const value = JSON.stringify(this.state.todos);
      		localStorage.setItem('todos', value);
        }
    }

    // Grabs the input
    addToDo(e) {
        e.preventDefault();

		const todo = e.target.elements.todo.value.trim().toLowerCase();
		
		if (!todo) {
			this.setState(() => ({ 
				error: 'Enter valid value to add item'
			}));
		} else if (this.state.todos.indexOf(todo) > -1) {
			this.setState(() => ({ 
				error: 'This Todo item already exists'
			}));
			e.target.elements.todo.value = '';
		} else {
			this.setState(() => ({ 
				error: ''
			}));
			this.setState((prevState) => ({todos: prevState.todos.concat(todo)}));
			e.target.elements.todo.value = '';
		}
    }

    // Handles removal of Focus field
    deleteToDo(todo) {
		this.setState((prevState) => ({
			todos: prevState.todos.filter((item) => item !== todo)
		}));
		this.setState(() => ({ 
			error: ''
		}));
	}
	
	// Strikes through item when checked
	strikeToDo() {
		// TODO: Strike through item when checked
	}
	
	
	
	render() {
		return (
			<div className="ToDo">
				<span onClick={this.handleOpenModal}>Todo</span>
				<Modal
					className="ToDo__Modal"
					overlayClassName="Overlay"
					isOpen={this.state.showModal}
					onRequestClose={this.handleCloseModal}
				>
					{/* Modal Content */}
					<div className="ToDo__Modal__Content">
                        <p id="ToDoCount">{this.state.todos.length} to do{this.state.todos.length > 1 && 's'}</p>
						{this.state.error && <p id="ToDoError">{this.state.error}</p>}

						{
							this.state.todos.map((todo) => (
								<div className="ToDoItems" key={todo}>
									<div id="CheckboxItemToDo" onClick={this.strikeToDo}>
										<input type="checkbox" id={todo} name="focus-check" />
										<label htmlFor={todo}></label>
									</div>
									<p id="ToDoItem">{todo}</p>
									<p id="DeleteToDo" onClick={(e) => {
										this.deleteToDo(todo);
									  }}>x</p>
								</div>
							))
						}

						<form onSubmit={this.addToDo}>
							<input id="ToDoInput" type="text" name="todo" placeholder="New Todo"/>
						</form>
					</div>
				</Modal>
			</div>
		);
	}
}

export default ToDo;