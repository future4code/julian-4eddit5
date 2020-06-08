import React from 'react';
import { Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import Feed from './components/Feed';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Post from './components/Post';

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {token && 
            <Feed />
          }
          {!token && 
            <Redirect to='/login' />
          }
        </Route>
        <Route exact path="/login">
          {!token &&
            <Login />
          }
          {token && 
            <Redirect to='/' />
          }
        </Route>
        <Route exact path="/signup">
          {!token &&
            <SignUp />
          }
          {token &&
            <Redirect to='/' />
          }
        </Route>
        <Route exact path="/post/:id">
          <Post />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
