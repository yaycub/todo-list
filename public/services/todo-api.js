const URL = '/api';

async function fetchWithError(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        return data;
    }
    else {
        throw data.error;
    }
}

export async function getTodos() {  
    const url = `${URL}/todos`;
    return fetchWithError(url);
}

export async function addTodo(todo) {  
    const url = `${URL}/todos`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    });

    const data = await response.json();
    return data;
}

export async function updateTodo(todo) {  
    const url = `${URL}/todos/${todo.id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    });

    const data = await response.json();
    return data;
}

export async function removeTodo(id) {  
    const url = `${URL}/todos/${id}`;
    return fetchWithError(url, {
        method: 'DELETE'
    });
}

