import React from 'react';
import '../style/Game.css';
import Board from './Board.js';
import { calculateWinner, lastElement } from '../utils';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    // bind once here, better than multiple times in render
    this.onTransitionChange = this.onTransitionChange.bind(this);
    this.state = {
      xIsNext: true,
      history: [this.resetSquares()],
      transition: ''
    }
  }

  get squares() {
    return lastElement(this.state.history)
  }

  get nextPlayer() {
    return `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
  }

  get winner() {
    return calculateWinner(this.squares)
  }

  get status() {
    if (this.winner) return `The winner is: ${this.winner.winner}`;
    return this.nextPlayer
  }


  resetSquares() {
    return Array(9).fill(null)
  }

  onResetClick() {
    this.setState({ history: [this.resetSquares()] })
  }

  onUndoClick() {
    if (this.state.history.length) {
      let history = [ ...this.state.history ]
      if (history.length > 1) {
        history.pop()
        this.setState({ history, xIsNext: !this.state.xIsNext })
      }
    }
  }


  onClick(i) {
    let history = [ ...this.state.history ]
    let squares = [ ...this.squares ]

    // If a player has already won or if the cell is already filled, do nothing 
    if (!squares[i] && !this.winner) {
      squares[i] = this.state.xIsNext ? 'X' : 'O'
      history.push(squares)
      this.setState({ xIsNext: !this.state.xIsNext, history })
    }
  }

  onTransitionChange(event) {
    this.setState({ [ event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={this.squares}
            winningPosition={this.winner?.winningPosition}
            transition={this.state.transition}
            onClick={(i) => this.onClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="game-status">{this.status}</div>
          <ol>{/* TODO */}</ol>
        </div>
        <div>
          <button onClick={() => this.onUndoClick()}>Undo</button>
          <button className="game-reset" onClick={() => this.onResetClick()}>Reset</button>
        </div>
        <div className="game-transition">
          <label htmlFor="transition-select">Choose a transition:</label>

          <select name="transition" value={this.state.transition} id="transition-select" onChange={this.onTransitionChange}>
            <option value="">--Please choose a winning transition--</option>
            <option value="rotate">Rotate</option>
            <option value="translate">Translate</option>
            <option value="scale">Scale</option>
          </select>
        </div>
      </div>
    );
  }
}
