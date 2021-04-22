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
    const winner = calculateWinner(this.squares)
    if (winner) return `The winner is: ${winner}`;
    return null
  }


  resetSquares() {
    return Array(9).fill(null)
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
            onClick={(i) => this.onClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{this.winner ?? this.nextPlayer}</div>
          <ol>{/* TODO */}</ol>
        </div>
        <div>
          <button onClick={() => this.onUndoClick()}>Undo</button>
        </div>
      </div>
    );
  }
}
