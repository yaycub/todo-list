import Component from '../Component.js';

class TodoItem extends Component {

    onRender(dom) {
        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const inactiveButton = dom.querySelector('.inactive-button');
        inactiveButton.addEventListener('click', () => {
            todo.complete = !todo.complete;
            onUpdate(todo);
        });
        
        const removeButton = dom.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            onRemove(todo);
        });
    }

    renderHTML() {
        const todo = this.props.todo;
        console.log(todo);

        return `
            <li class="todo-item">
                <span class="${todo.complete ? 'completed' : ''}">${todo.task}</span>
                <div>
                    <button class="inactive-button">
                        Mark ${todo.complete ? 'Incomplete' : 'Complete'}
                    </button>
                    
                    <button class="remove-button">
                        🗑
                    </button>
                </div>
            </li>
        `;
    }
}

export default TodoItem;