import React from "react";

class LoadingMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMessage: false
    };

    this.timer = setTimeout(this.enableMessage, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enableMessage = () => {
    this.setState({ displayMessage: true });
  };

  render() {
    const { displayMessage } = this.state;

    if (!displayMessage) {
      return null;
    }

    return <div>Loading...</div>;
  }
}

export default LoadingMessage;
