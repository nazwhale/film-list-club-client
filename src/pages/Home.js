import React from "react";
import styled from "styled-components";

import {
  FilmListItem,
  FilmAdder,
  FadeOut,
  LoadingMessage,
  DiscoverLinks
} from "../components";
import { theme } from "../theme";

import { APIError, fetchFromAPI } from "../api";

import AuthService from "../auth";
const Auth = new AuthService();

const LastActionText = styled.p`
  color: ${theme.color.darkGrey};
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 10px;
`;

const EmptyListPrompt = styled.p`
  color: ${theme.color.darkGrey};
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: ${theme.color.darkGrey};

  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 10px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${theme.color.darkGrey};
  }

  &::before {
    margin-right: 0.5rem;
  }

  &::after {
    margin-left: 0.5rem;
  }
`;

class Home extends React.Component {
  state = {
    listData: null,
    error: null,
    isLoading: false,
    titleInputValue: "",
    filmAdderToggled: false,
    lastActionText: ""
  };

  async componentDidMount() {
    this.fetchListItems();
  }

  async fetchListItems() {
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

  handleFilmAdderSubmit = async event => {
    const { titleInputValue } = this.state;
    const userId = Auth.getUserId();

    try {
      await fetchFromAPI("POST", "create-list-item", {
        user_id: userId,
        title: titleInputValue
      });

      const lastActionText = `Added "${titleInputValue}"`;
      this.setState({ error: null, isLoading: false, lastActionText });
      this.fetchListItems();
    } catch (err) {
      let error = new APIError({ data: "Network error" });
      if (err.response != null) {
        error = new APIError(err.response);
      }
      this.setState({ error, isLoading: false });
    }
  };

  toggleFilmAdder = event => {
    this.setState({ filmAdderToggled: !this.state.filmAdderToggled });
  };

  handleListItemDelete = async (itemId, itemTitle) => {
    try {
      await fetchFromAPI("POST", "delete-list-item", {
        item_id: itemId
      });

      const lastActionText = `Removed "${itemTitle}"`;
      this.setState({ error: null, isLoading: false, lastActionText });
      this.fetchListItems();
    } catch (err) {
      let error = new APIError({ data: "Network error" });
      if (err.response != null) {
        error = new APIError(err.response);
      }
      this.setState({ error, isLoading: false });
    }
  };

  render() {
    const {
      listData,
      isLoading,
      error,
      titleInputValue,
      filmAdderToggled,
      lastActionText
    } = this.state;

    if (isLoading) {
      return <LoadingMessage />;
    }

    return (
      <>
        <FadeOut duration={2000} delay={1000}>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center"
            }}
          >
            {lastActionText !== "" && (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "#ffffff",
                  border: "2px solid lightgrey",
                  borderRadius: "5px",
                  padding: "0 1rem",
                  top: "-70px"
                }}
              >
                <LastActionText>{lastActionText}</LastActionText>
              </div>
            )}
          </div>
        </FadeOut>

        <DiscoverLinks />

        <FilmAdder
          isAdding={filmAdderToggled}
          inputValue={titleInputValue}
          onInputChange={this.handleFilmAdderInputChange}
          onSubmit={this.handleFilmAdderSubmit}
          onToggle={this.toggleFilmAdder}
        />

        {error != null && (
          <p>
            Error: <code>{`${error.status}: ${error.data}`}</code>
          </p>
        )}

        {listData == null ? (
          <hr />
        ) : (
          <Separator>{`${listData.length} films`}</Separator>
        )}

        {listData == null ? (
          <div
            style={{
              padding: "0 1rem",
              border: "1px dashed lightgrey",
              borderRadius: "5px",
              margin: "2rem 0"
            }}
          >
            <EmptyListPrompt>
              It looks like you haven’t added any films to your list yet. Start
              by typing the name of a film you’d like to see in the box above...
            </EmptyListPrompt>
          </div>
        ) : (
          listData.map(l => {
            return (
              <FilmListItem
                key={l.id}
                title={l.title}
                onDelete={() => this.handleListItemDelete(l.id, l.title)}
              />
            );
          })
        )}
      </>
    );
  }
}

export default Home;
