import React from "react";
import { Emoji, FilmListItem, FilmAdder } from "../components";

import { APIError } from "../api";
import { fetchFromAPI } from "../api";

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
    try {
      const rsp = await fetchFromAPI("POST", "list-items-for-user", {
        user_id: 4
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

    if (listData == null) {
      return "No items in list";
    }

    if (listData.length === 0) {
      return "No items in list";
    }

    return (
      <>
        <h3>
          <Emoji emojum="👋" label="wave" />
          Hello you logged in user you
        </h3>

        <FilmAdder
          isAdding={filmAdderToggled}
          inputValue={titleInputValue}
          onInputChange={this.handleFilmAdderInputChange}
          onSubmit={this.handleFilmAdderSubmit}
          onToggle={this.toggleFilmAdder}
        />

        <hr />

        {listData.map(l => {
          return <FilmListItem key={l.id} title={l.title} />;
        })}

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
