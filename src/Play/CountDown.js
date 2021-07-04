import React from "react";


export default class CountDown extends React.Component {
  constructor() {
    super();
    this.state = { second: 0, seconds: 30 };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    if (this.timer === 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
    }
    let timeLeftVar = this.state.seconds;
    this.setState({ second: timeLeftVar });
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      second: seconds,
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds === 0) { 
      clearInterval(this.timer);
    }
  }

  render() {
    if (!this.props.startCountDown) {
      return <h1>   </h1>
    }
    return(
      <div>
        <h1>00:{this.state.second}</h1>
      </div>
    );
  }
}