import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { APIError } from "../api";

import AuthService from "../auth";
const Auth = new AuthService();

const Container = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const FormLabel = styled.label`
  margin: 5px;
`;

const FormSubmit = styled.input`
  margin: 5px;
`;

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    loginDeets: null,
    error: null
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      const rsp = await Auth.login(email, password);
      this.setState({ loginDeets: rsp, error: null });
      this.props.history.push("/app");
    } catch (err) {
      let error = new APIError({ data: "Network error" });
      if (err.response != null) {
        error = new APIError(err.response);
      }
      this.setState({ error });
    }
  };

  render() {
    const { error } = this.state;

    return (
      <Container>
        <h1>Log in</h1>

        <Form onSubmit={this.handleSubmit}>
          <FormLabel>
            Email{" "}
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </FormLabel>
          <FormLabel>
            Password{" "}
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </FormLabel>
          <FormSubmit type="submit" value="Submit" />
        </Form>

        {error != null && (
          <p>
            Error: <code>{`${error.status}: ${error.data}`}</code>
          </p>
        )}

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <p>I'm new here</p>
        </Link>
      </Container>
    );
  }
}
