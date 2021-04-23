import React from 'react';
import '../style/Square.css';

export default class Square extends React.Component {
  squareModifiers() {
    if (this.props.winningPosition) {
      const baseModifiers = 'square--winning'
      let transitionModifiers = baseModifiers
      if (this.props.transition) {
        transitionModifiers += `-${this.props.transition}`

        // Return baseModifers for color and transitionModifiers
        return `${baseModifiers} ${transitionModifiers}`
      }
      return baseModifiers
    }
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