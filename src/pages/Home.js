import React from "react";
import { Button, Emoji } from "../components";
import AuthService from "../auth";
const Auth = new AuthService();

class Home extends React.Component {
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

  handleClick = async () => {
    console.log("💥");
    try {
      await Auth.logout();
    } catch (err) {
      alert(err);
    }
  };

  render() {
    const { data } = this.state;

    if (data == null) {
      return "loading data...";
    }

    return (
      <>
        <h3>
          <Emoji emojum="👋" label="wave" />
          Hello you logged in user you
        </h3>
        {data.map(r => {
          return <p key={r.id}>{r.name}</p>;
        })}
      </>
    );
  }
}

export default Home;
