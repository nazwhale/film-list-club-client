import React from "react";
import { FilmListItem, FilmAdder } from "../components";

import { APIError } from "../api";
import { fetchFromAPI } from "../api";

import AuthService from "../auth";
const Auth = new AuthService();

class Home extends React.Component {
  state = {
    listData: null,
    error: null,
    isLoading: false,
    titleInputValue: "",
    filmAdderToggled: false
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const userId = Auth.getUserId();

    try {
      const rsp = await fetchFromAPI("POST", "list-items-for-user", {
        user_id: userId
      });

      this.setState({ listData: rsp.data, error: null, isLoading: false });
    } catch (err) {
      let error = new APIError({ data: "Network error" });
      if (err.response != null) {
        error = new APIError(err.response);
      }
      this.setState({ error, isLoading: false });
    }
  }

  handleFilmAdderInputChange = event => {
    const { value } = event.target;
    this.setState({
      titleInputValue: value
    });
  };

  handleFilmAdderSubmit = event => {
    // post value to db
    console.log("about to post to db", this.state.titleInputValue);
    this.setState({ filmAdderToggled: false });
  };

  toggleFilmAdder = event => {
    this.setState({ filmAdderToggled: !this.state.filmAdderToggled });
  };

  render() {
    const {
      listData,
      isLoading,
      error,
      titleInputValue,
      filmAdderToggled
    } = this.state;

    if (isLoading) {
      return "loading data...";
    }

    return (
      <>
        <FilmAdder
          isAdding={filmAdderToggled}
          inputValue={titleInputValue}
          onInputChange={this.handleFilmAdderInputChange}
          onSubmit={this.handleFilmAdderSubmit}
          onToggle={this.toggleFilmAdder}
        />

        <hr />

        {listData == null ? (
          <p>nufink</p>
        ) : (
          listData.map(l => {
            return <FilmListItem key={l.id} title={l.title} />;
          })
        )}

        {error != null && (
          <p>
            Error: <code>{`${error.status}: ${error.data}`}</code>
          </p>
        )}
      </>
    );
  }
}

export default Home;
