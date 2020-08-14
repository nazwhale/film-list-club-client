import React from "react";
import { Link } from "react-router-dom";

class Landing extends React.Component {
  render() {
    return (
      <>
        <h1>This is a landing page</h1>

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <p>Sign Up</p>
        </Link>

        <Link to="/login" style={{ textDecoration: "none" }}>
          <p>Login</p>
        </Link>

        <Link to="/app" style={{ textDecoration: "none" }}>
          <p>My List</p>
        </Link>
      </>
    );
  }
}

export default Landing;
