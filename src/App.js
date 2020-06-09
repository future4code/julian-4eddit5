import React from 'react';
import { Switch, Route, BrowserRouter} from "react-router-dom";
import Feed from './components/Feed';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Post from './components/Post';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <Route exact path="/login">
            <Login />
        </Route>
        <Route exact path="/signup">
            <SignUp />
        </Route>
        <Route exact path="/post/:id">
            <Post />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;