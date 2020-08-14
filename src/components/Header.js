import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { theme } from "../theme";

import AuthService from "../auth";
const Auth = new AuthService();

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

const LogoutButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font: inherit;
  font-weight: bold;
`;

const LogoutText = styled.h3`
  &:hover {
    background: linear-gradient(to right, #3ec7e0, #526bf4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

class Header extends React.Component {
  logout = async () => {
    try {
      const userId = Auth.getUserId();
      await Auth.logout(userId);
      this.props.history.push("/login");
    } catch (err) {
      alert(err);
    }
  };

  render() {
    return (
      <Container>
        <h1>Film List Club</h1>
        <LogoutButton onClick={this.logout}>
          <LogoutText>Logout</LogoutText>
        </LogoutButton>
      </Container>
    );
  }
}

export default withRouter(Header);
