import React, { Component } from "react";
import Snek from "./Snek";
import Food from "./Food";
//import Snek from "./Snek";
// import { render } from 'react-dom';
// import Canvas from "./canvas";
import "./styles.css";

const getRandomXY = () => {
  const size = 4;
  let min = 1;
  let max = 99;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / size) * size;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / size) * size;
  return [x, y];
};

const startingState = {
  started: false,
  food: getRandomXY(),
  vector: "RIGHT",
  previousVector: "RIGHT",
  size: 4,
  speed: 150,
  intervalId: 0,
  snekBodys: [
    [0, 0],
    [4, 0]
  ]
};

class App extends Component {
  state = startingState;

  componentDidMount() {
    document.onkeydown = this.onKeyDown;
    // document.onkeyup = this.slither;
  }
  shouldComponentUpdate() {
    return this.state.started;
  }
  componentDidUpdate() {
    this.borderCheck();
    this.snekBorderCheck();
    this.onFood();
  }

  onKeyDown = (e: any) => {
    const ev = e || window.event;
    this.setState({ previousVector: this.state.vector });
    switch (ev.keyCode) {
      case 38:
        if (this.state.previousVector !== "DOWN") {
          this.setState({ vector: "UP" });
        }
        console.log("UP");
        break;
      case 40:
        if (this.state.previousVector !== "UP") {
          this.setState({ vector: "DOWN" });
        }
        console.log("DOWN");
        break;
      case 37:
        if (this.state.previousVector !== "RIGHT") {
          this.setState({ vector: "LEFT" });
        }
        console.log("LEFT");
        break;
      case 39:
        if (this.state.previousVector !== "LEFT") {
          this.setState({ vector: "RIGHT" });
        }
        console.log("RIGHT");
        break;
    }

    if (!this.state.started) {
      this.setState({ started: true });
      clearInterval(this.state.intervalId);
      let intervalId = setInterval(this.slither, this.state.speed);
      this.setState({ intervalId: intervalId });
    }
  };

  slither = () => {
    let segments = [...this.state.snekBodys];
    let head = segments[segments.length - 1];
    const size = this.state.size;

    switch (this.state.vector) {
      case "RIGHT":
        head = [head[0] + size, head[1]];
        break;
      case "LEFT":
        head = [head[0] - size, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + size];
        break;
      case "UP":
        head = [head[0], head[1] - size];
        break;
    }
    segments.push(head);
    segments.shift();
    this.setState({
      snekBodys: segments
    });
  };

  borderCheck() {
    let head = this.state.snekBodys[this.state.snekBodys.length - 1];
    const size = this.state.size;
    if (
      head[0] > 100 - size ||
      head[1] > 100 - size ||
      head[0] < 0 ||
      head[1] < 0
    ) {
      this.onGameOver();
    }
  }
  onGameOver() {
    clearInterval(this.state.intervalId);
    alert(`Game Over. Dead Snek length is ${this.state.snekBodys.length}`);
    this.setState(startingState);
  }

  snekBorderCheck() {
    let wholeSnek = [...this.state.snekBodys];
    let head = wholeSnek[wholeSnek.length - 1];
    wholeSnek.pop();
    wholeSnek.forEach((seg) => {
      if (head[0] === seg[0] && head[1] === seg[1]) {
        this.onGameOver();
      }
    });
  }

  onFood() {
    let head = this.state.snekBodys[this.state.snekBodys.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomXY()
      });
      this.growSnek();
      this.increaseSpeed();
    }
  }

  growSnek() {
    let newSnek = [...this.state.snekBodys];
    newSnek.unshift([]);
    this.setState({
      snekBodys: newSnek
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 20
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Snek</h1>
        {/* <h3> X: {this.state.snekBodys[this.state.snekBodys.length - 1][0]} </h3>
        <h3> Y: {this.state.snekBodys[this.state.snekBodys.length - 1][1]} </h3> */}

        <div className="board" id="canvas">
          <Snek snekBodys={this.state.snekBodys} />
          <Food seg={this.state.food} />
          {/* <div className="snek-seg"></div> */}
        </div>

        {/* <Canvas /> */}
      </div>
    );
  }
}

export default App;
