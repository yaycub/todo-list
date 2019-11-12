import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import AddTodo from './AddTodo.js';
import TodoList from './TodoList.js';
import { getTodos, addTodo, updateTodo, removeTodo } from '../services/todo-api.js';

class TodoApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'DO THESE JACOB' });
        dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');
        const error = dom.querySelector('.error');

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        const addTodos = new AddTodo({
            onAdd: async todo => {
                loading.update({ loading: true });
                error.textContent = '';

                try {
                    const saved = await addTodo(todo);
                    
                    const todos = this.state.todos;
                    todos.push(saved);

                    todoList.update({ todos });
                }
                catch (err) {
                    error.textContent = err;
                    throw err;
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });

        main.appendChild(addTodos.renderDOM());

        const todoList = new TodoList({ 
            todos: [],
            onUpdate: async todo => {
                loading.update({ loading: true });
                error.textContent = '';

                try {
                    const updated = await updateTodo(todo);
                    const todosUpdated = this.state.todos;
                    const index = todosUpdated.indexOf(todo);
                    todosUpdated.splice(index, 1, updated);
                
                    todoList.update({ todos: todosUpdated });
                }
                catch (err) {
                    error.textContent = err;
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            },
            onRemove: async todo => {
                loading.update({ loading: true });
                error.textContent = '';

                try {
                    await removeTodo(todo.id);
                    const todosAfterRemoval = this.state.todos;
                    const index = todosAfterRemoval.indexOf(todo);
                    todosAfterRemoval.splice(index, 1);
                    
                    todoList.update({ todos: todosAfterRemoval });
                }
                catch (err) {
                    error.textContent = err;
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });

        main.appendChild(todoList.renderDOM());

        try {
            const todos = await getTodos();
            this.state.todos = todos;

            todoList.update({ todos });
        }
        catch (err) {
            error.textContent = err;
            console.log(err);
        }
        finally {
            loading.update({ loading: false });
        }

    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <!-- show errors: -->
                <p class="error"></p>
                <main>
                    <!-- add todo goes here -->
                    <!-- todo list goes here -->
                </main>
            </div>
        `;
    }
}

export default TodoApp;