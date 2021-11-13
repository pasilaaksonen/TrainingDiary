import React, { useState } from 'react';
import Etusivu from './components/Etusivu';
import AmmattilaistenTulokset from './components/AmmattilaistenTulokset';
import HarrastajienTulokset from './components/HarrastajienTulokset';
import OmatTreenit from './components/OmatTreenit';
import Navigointi from './components/Navigointi';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from './ProtectedPages/ProtectedRoute';

const App = () => {

    const [isLogged, setIsLogged] = useState(false)
    const [isLoggedAmmattilainen, setIsLoggedAmmattilainen] = useState(false)
    const [name, setName] = useState("");
    //
    return (
        <>
        <Router>
            <Navigointi 
            setIsLogged={setIsLogged} 
            isLogged={isLogged}
            isLoggedAmmattilainen={isLoggedAmmattilainen}
            setIsLoggedAmmattilainen={setIsLoggedAmmattilainen}
            name={name}
            setName={setName}
            />
            <Switch>
                <Route path='/' exact render={() => <Etusivu />}/>
                <ProtectedRoute path='/ammattilaisten_tulokset' component={AmmattilaistenTulokset} isAuth={isLoggedAmmattilainen}/>
                <Route path='/harrastajien_tulokset' exact render={() => <HarrastajienTulokset />}/>
                <ProtectedRoute path='/omat_treenit' 
                component={OmatTreenit} 
                isAuth={isLogged}
                name={name}
                isLoggedAmmattilainen = {isLoggedAmmattilainen}
                />
            </Switch>
        </Router>
        </>
)};

export default App;
