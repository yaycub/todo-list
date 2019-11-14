const client = require('../lib/client');
// import our seed data:
const todos = require('./todos');
const users = require('./users.js');

run();

async function run() {

    try {
        await client.connect();

        const startUsers = await Promise.all(
            users.map(async user => {
                const result = await client.query(`
                    INSERT INTO users (email, hash)
                    VALUES ($1, $2)
                    RETURNING *;
                `,
                [user.email, user.password]);

                return result.rows[0];
            })
        );

        await Promise.all(
            todos.map(todo => {
                const user = startUsers.find(userData => {
                    return userData.id === todo.user_id;
                });

                return client.query(`
                    INSERT INTO todos (task, user_id, complete)
                    VALUES ($1, $2, $3);
                `,
                [todo.task, user.id, todo.complete]);
            })
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}
