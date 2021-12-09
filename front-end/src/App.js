import React, { useState, useEffect } from 'react';
import Etusivu from './components/Etusivu';
import AmmattilaistenTulokset from './components/AmmattilaistenTulokset';
import HarrastajienTulokset from './components/HarrastajienTulokset';
import OmatTreenit from './components/OmatTreenit';
import OmaProfiili from './components/OmaProfiili';
import Navigointi from './components/Navigointi';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedPages/ProtectedRoute';
import trainingDiaryServices from './services/trainingDiary';
import Footer from './components/Footer'

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoggedAmmattilainen, setIsLoggedAmmattilainen] = useState(false);
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTrainingDiaryAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      trainingDiaryServices.setToken(user.token)
    }
  }, [])
  
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedTrainingDiaryAppUser')
    window.location.reload()
  }

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
          setUser={setUser}
        />
        <Switch>
          <Route path='/' exact render={() => <Etusivu />} />
          <ProtectedRoute
            path='/ammattilaisten_tulokset'
            component={AmmattilaistenTulokset}
            isAuth={isLoggedAmmattilainen}
          />
          <Route
            path='/harrastajien_tulokset'
            exact
            render={() => <HarrastajienTulokset />}
          />
          <ProtectedRoute
            path='/omat_treenit'
            component={OmatTreenit}
            isAuth={isLogged}
            name={name}
            isLoggedAmmattilainen={isLoggedAmmattilainen}
          />
          <ProtectedRoute
            path='/oma_profiili'
            component={OmaProfiili}
            isAuth={isLogged}
            name={name}
            user={user}
            isLoggedAmmattilainen={isLoggedAmmattilainen}
          />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
