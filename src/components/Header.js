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

  &:hover {
    color: ${theme.color.primaryHover};
  }
`;

class Header extends React.Component {
  logout = async () => {
    try {
      await Auth.logout(3);
      this.props.history.push("/login");
    } catch (err) {
      alert(err);
    }
  };

  render() {
    return (
      <Container>
        <h1>Name of thing</h1>
        <LogoutButton onClick={this.logout}>logout</LogoutButton>
      </Container>
    );
  }
}

export default withRouter(Header);
