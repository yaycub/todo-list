import Component from '../Component.js';
import Header from '../common/Header.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import { userSignUp, userSignIn } from '../services/todo-api.js';

class App extends Component {

    onRender(dom) {
        const header = new Header({ title: 'Welcome to the best damn todo list website on the best internet of lists' });
        dom.prepend(header.renderDOM());

        const token = localStorage.getItem('TOKEN');
        if (token) {
            const logout = dom.querySelector('.logout');
            logout.addEventListener('click', () => {
                localStorage.removeItem('TOKEN');
                this.update();
            });

            return;
        }

        const errors = dom.querySelector('.errors');
        const signUpDisplay = dom.querySelector('#signup-display');
        const signInDisplay = dom.querySelector('#signin-display');

        const signUp = new SignUp({
            onSignUp: async newUser=> {
                errors.textContent = '';

                try {
                    const user = await userSignUp(newUser);
                    success(user);
                }
                
                catch (err) {
                    errors.textContent = err;
                    console.log(err);
                }
            }
        });
        signUpDisplay.appendChild(signUp.renderDOM());

        const signIn = new SignIn({
            onSignIn: async credentials => {
                errors.textContent = '';

                try {
                    const user = await userSignIn(credentials);
                    success(user);
                }

                catch (err) {
                    errors.textContent = err;
                    console.log(err);
                }
            }
        });
        signInDisplay.appendChild(signIn.renderDOM());

        const toSignIn = dom.querySelector('#signin-button');
        toSignIn.addEventListener('click', () => {
            signInDisplay.classList.remove('no-display');
            signUpDisplay.classList.add('no-display');
        });

        const toSignUp = dom.querySelector('#signup-button');
        toSignUp.addEventListener('click', () => {
            signUpDisplay.classList.remove('no-display');
            signInDisplay.classList.add('no-display');
        });
    }

    renderHTML() {
        const token = localStorage.getItem('TOKEN');

        if (token) {
            return `
                <div>
                    <main>
                        <section class="user-display">
                            <p>
                                You are currently logged in!
                            </p>
                            <p>
                                <button class="logout">Logout</button>
                            </p>
                        </section>
                    </main>
                </div>
            `;
        }

        return `
            <div>
                <main>
                    <p class="errors"></p>
                    
                    <section class="no-display" id="signup-display">
                        <p class="switch">
                            <button id="signin-button">Already a User?</button>
                        </p>
                        <!-- SignUp goes here -->
                    </section>
                    <section id="signin-display">
                        <p class="switch">
                            <button id="signup-button">Need to create an Account?</button>
                        </p>
                        <!-- SignIn goes here -->
                    </section>
                </main>
            </div>
        `;
    }
}

function success(user) {
    localStorage.setItem('TOKEN', user.token);
    const searchParams = new URLSearchParams(location.search);
    location = searchParams.get('redirect') || './todo.html';
}

export default App;