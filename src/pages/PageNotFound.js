import React from "react";
import { Link } from "react-router-dom";

class PageNotFound extends React.Component {
  render() {
    return (
      <>
        <h1>You're lost</h1>

        <Link to="/" style={{ textDecoration: "none" }}>
          <p>Go home</p>
        </Link>
      </>
    );
  }
}

export default PageNotFound;
