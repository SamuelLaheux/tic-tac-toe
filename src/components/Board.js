import React from 'react';
import '../style/Board.css';
import Square from './Square.js';


export default class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        winningPosition={this.props.winningPosition?.includes(i) ?? false}
        value={this.props.squares[i]}
        transition={this.props.transition}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}