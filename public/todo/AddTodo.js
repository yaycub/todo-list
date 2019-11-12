import Component from '../Component.js';

class AddTodo extends Component {

    onRender(dom) {
        const onAdd = this.props.onAdd;
        const input = dom.querySelector('input[name=new-todo]');
        
        dom.addEventListener('submit', async event => {
            event.preventDefault();

            const newTodo = {
                task: input.value,
                complete: false
            };

            try {
                await onAdd(newTodo);
                // this only runs if no error:
                dom.reset();
                document.activeElement.blur();
            }
            catch (err) {
                // nothing to do as App will show error,
                // but will keep form from clearing...
            }
        });
    }

    renderHTML() {
        return `
            <form>
                <input name="new-todo" placeholder="Add a Task" required>
                <button>Add</button>
            </form>
        `;
    }
}

export default AddTodo;