import React from 'react';
import Modal from "react-modal";
import "../styles/ToDo.css";


class ToDo extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			todos: [
				// 'React',
				// 'JavaScript'
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
      
          if (value) {
            console.log(value);
          }
        } catch (e) {
          // Do nothing
		}
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
			  console.log(`Todos is ${this.state.todos}`);
        }
        // console.log(`Todos is ${this.state.todos} ${value}`);
    }

    // Grabs the input
    addToDo(e) {
        e.preventDefault();
		console.log(`Todo added`);
    }

    // Handles removal of Focus field
    deleteToDo() {
		this.setState({
			todos: []
		})
        console.log(`Todo deleted`);
	}
	
	strikeToDo() {
		console.log('To Do Strike');
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
                        <p>{this.state.todos.length} to do{this.state.todos.length > 1 && 's'}</p>
                        <div className="ToDo__List">
                            <input type="checkbox" id="react" name="todo" value="Learn React"></input>
                            <label htmlFor="react">Learn React</label>
                        </div>

						<div className="ToDoItems">
							<div id="CheckboxItem" onClick={this.strikeToDo}>
								<input type="checkbox" id="FocusCheck" name="focus-check" />
								<label htmlFor="FocusCheck"></label>
							</div>
							<p id="ToDoItem"  >{this.state.todos}</p>
							<p id="DeleteToDo" onClick={this.deleteToDo}>x</p>
						</div>
						

						<input type="text" name="todo" placeholder="New Todo"/>
					</div>
				</Modal>
			</div>
		);
	}
}

export default ToDo;