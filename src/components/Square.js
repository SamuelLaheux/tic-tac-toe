import React from 'react';

export default class Square extends React.Component {
  squareModifiers() {
    if (this.props.winningPosition) return 'square--winning'
    return ''
  }
  
  render() {
    return (
      <button 
        className={`square ${this.squareModifiers()}`}
        onClick={() => this.props.onClick()}
      >
        { this.props.value }
      </button>
    );
  }
}