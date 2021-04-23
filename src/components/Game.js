import React from 'react';
import '../index.css';
import Board from './Board.js';
import { calculateWinner, lastElement } from '../utils';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      history: [this.resetSquares()]
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

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={this.squares}
            winningPosition={this.winner?.winningPosition}
            onClick={(i) => this.onClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{this.status}</div>
          <ol>{/* TODO */}</ol>
        </div>
        <div>
          <button onClick={() => this.onUndoClick()}>Undo</button>
          <button className="game-reset" onClick={() => this.onResetClick()}>Reset</button>
        </div>
      </div>
    );
  }
}
