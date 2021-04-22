import React from 'react';
import '../index.css';
import Square from './Square.js';
import { calculateWinner } from '../utils'


export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: this.resetSquares(),
      xIsNext: true,
      history: []
    }
  }

  get nextPlayer() {
    return `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
  }

  get winner() {
    const winner = calculateWinner(this.state.squares)
    if (winner) return `The winner is: ${winner}`;
    return null
  }

  resetSquares() {
    return Array(9).fill(null)
  }

  handleUndoClick() {
    if (this.state.history.length) {
      const history = [ ...this.state.history ]
      history.pop()
      const squares = history.length > 0 ? history[history.length - 1] : this.resetSquares()
      this.setState({ history, squares, xIsNext: !this.state.xIsNext })
    }
  }

  handleClick(i) {
    let squares = [ ...this.state.squares ]
    let history = [ ...this.state.history ]

    // If a player has already won or if the cell is already filled, do nothing 
    if (!squares[i] && !this.winner) {
      squares[i] = this.state.xIsNext ? 'X' : 'O'
      history.push(squares)
      this.setState({ squares, xIsNext: !this.state.xIsNext, history })
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="status">{this.winner ?? this.nextPlayer}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div>
          <button onClick={() => this.handleUndoClick()}>Undo</button>
        </div>
      </div>
    );
  }
}