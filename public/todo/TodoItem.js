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
            const confirmed = confirm(`Are you sure you want to remove "${todo.task}"?`);
            if (confirmed) {
                onRemove(todo);
            }
        });
    }

    renderHTML() {
        const todo = this.props.todo;

        return `
            <li class="cat-type">
                <span class="${todo.complete ? 'inactive' : ''}">${todo.task}</span>
                <div>
                    <button class="inactive-button">
                        Make ${todo.complete ? 'Active' : 'Inactive'}
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