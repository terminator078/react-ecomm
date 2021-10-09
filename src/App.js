import React, { useState, useEffect } from 'react'
import { Context } from "./context/context";
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Main from './pages/main/main'
import Cart from './pages/cart/cart'
import FullItem from "./pages/main/fullItem";
// import Fire from './firebase/firebase'
import {auth} from './firebase/firebase'
import Login from './firebase/login'
// import NavBar from './pages/main/Components/navBar';

 const App = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(true);
    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    };
    const handleLogin = () => {
        clearErrors();
        // Fire
        //     .auth()
             auth.signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                    default:
                }
            });
    };
    const handleSignin = () => {
        clearErrors();
       // Fire
        //     .auth()
        auth.createUserWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                    default:
                }
            });
    };
    const handleLogout = () => {
        // Fire.auth().
        auth.signOut();
    };
    const authListener = () => {
        // Fire.auth()
        auth.onAuthStateChanged((user) => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser('');
            }
        });
    };
    useEffect(() => {
        authListener();
    });
    return (
        <>
            {user ? (
                <BrowserRouter>
                <Context>
                    {/* <NavBar handleLogout={handleLogout} /> */}
                        <Switch>
                        <Route exact path="/" render={() => <Main handleLogout={handleLogout}/>}/>
                        <Route path="/cart" component={Cart} exact/>
                        <Route path="/item/:id" children={<FullItem  />} />
                        </Switch>
                </Context>
                </BrowserRouter>
            ) : (
                <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    handleSignin={handleSignin}
                    hasAccount={hasAccount}
                    setHasAccount={setHasAccount}
                    emailError={emailError}
                    passwordError={passwordError}
                />
            )}
        </>
    )
}

export default App