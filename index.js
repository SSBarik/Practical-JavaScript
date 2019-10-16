// todoList object 
// conatains the todos array along with the various funtions for operations
const todoList = {
    todos: [],
    displayTodos() {
        if(this.todos.length == 0) {
            console.log('Your todo list is empty');
        } else {
            console.log('My Todos:');
            for(let todo in this.todos){
                if(this.todos[todo].completed === true) {
                    console.log('( x ) ', this.todos[todo].todoText);
                } else {
                    console.log('( ) ', this.todos[todo].todoText);
                }
            }
        }
    },
    addTodo(todoText) {
        this.todos.push({
            todoText: todoText, //i
            completed: false
        });
        this.displayTodos();
    },
    changeTodo(position, todoText) {
        this.todos[--position].todoText = todoText;
        this.displayTodos();
    },
    deleteTodo(position) {
        this.todos.splice(position, 1);
        this.displayTodos();
    },
    toggleCompleted(position) {
        let todo = this.todos[position];
        todo.completed = !todo.completed;
        this.displayTodos();
    },
    toggleAll() {
        let totalTodos = this.todos.length;
        let completedTodos = 0;
        // get number of completed todos
        for(todo in this.todos) {
            if(this.todos[todo].completed === true)
                completedTodos++;
        }
        // Case 1: if everything is true, make everything false
        if(completedTodos === totalTodos) {
            for(todo in this.todos) {
                this.todos[todo].completed = false;
            }
        }
        // Case 2: if everything is false, make everything true
        else {
            for(todo in this.todos) {
                this.todos[todo].completed = true;
            }
        }
        this.displayTodos();  
    }
};

// handling the requests and data
let handlers = {
    toggleAll() {
        todoList.toggleAll();
        view.displayTodos();
    },
    addTodo() {
        let addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value= '';
        view.displayTodos();
    },
    changeTodo() {
        let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        let changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodo(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted() {
        let toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(--toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = '';
        view.displayTodos();
    }
};

// creating the DOM elements
let view = {
    displayTodos() {
        let todosol = document.querySelector('ol');
        todosol.innerHTML = '';
        for(let i = 0; i < todoList.todos.length; i++) {
            let todoLi = document.createElement('li');
            let todo = todoList.todos[i];
            let todoTextWithCompletion = '';

            todoTextWithCompletion = todo.todoText;
            
            if(todo.completed === true) {
                todoLi.className = "done";
            } 

            todoLi.id = i;             
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosol.appendChild(todoLi);
        }
    },
    createDeleteButton() {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },

    // Event  delegation  
    setUpEventListeners() {
        let todosol = document.querySelector('ol');
        todosol.addEventListener('click', function(event) {
            
            // get the element that was clicked on
            let elementClicked = event.target;

            // check if elementClicked is a delete button
            if(elementClicked.className === 'deleteButton') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });
    }
};

view.setUpEventListeners();

