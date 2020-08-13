import React from "react";
import { Link } from "react-router-dom";

class Landing extends React.Component {
  state = {
    data: null
  };

  componentDidMount() {
    const data = [
      {
        id: 1,
        name: "bill"
      },
      {
        id: 2,
        name: "ben"
      },
      {
        id: 3,
        name: "flowerpot men"
      }
    ];
    this.setState({ data });
  }

  handleClick = () => {
    console.log("💥");
  };

  render() {
    const { data } = this.state;

    if (data == null) {
      return "loading data...";
    }

    return (
      <>
        <h1>This is a landing page</h1>

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <p>Sign Up</p>
        </Link>

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <p>Login</p>
        </Link>
      </>
    );
  }
}

export default Landing;
