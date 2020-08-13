import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Landing from "./pages/Landing";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import AuthService from "./auth";
import * as serviceWorker from "./serviceWorker";
import "./theme/index.css";

// TODO: protected routes
//
// See:
// https://reactrouter.com/web/example/auth-workflow
// For making protected routes
//
// tldr; middleware for checking user is authenticated before a page load
//       for routes you should be authed to view

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />

        <PrivateRoute path="/app" component={App} />

        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ path, component }) {
  const Auth = new AuthService();

  // TODO: Lookup how to do this properly
  // Cant make it async / await, as it's a component 🤔
  // So how to wait on the promise?
  const isLoggedIn = Auth.isLoggedIn("user_001");
  console.log("isLoggedIn", isLoggedIn); // Why is this a promise???

  if (!isLoggedIn) {
    return (
      <Route
        path={path}
        render={({ location }) => (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )}
      />
    );
  }
  return <Route path={path} component={component} />;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
