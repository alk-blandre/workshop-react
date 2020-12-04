import React from 'react';

const basicsStyle: React.CSSProperties = {
  fontSize: '1.5em',
};

const buttonStyle: React.CSSProperties = {
  width: '2em',
  height: '2em',
  textAlign: 'center',
};

export class BasicsClass extends React.Component<{}, { count: number }> {
  state = { count: 0 };

  decrement = () => {
    this.setState(({ count }) => ({ count: count - 1 }));
  };

  increment = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  };

  render() {
    return (
      <div className="Basics" style={basicsStyle}>
        <p className="Basics__counter">{this.state.count}</p>
        <p>
          <button onClick={this.decrement} style={buttonStyle}>
            -
          </button>
          <button onClick={this.increment} style={buttonStyle}>
            +
          </button>
        </p>
      </div>
    );
  }
}

export function BasicsFunc() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="Basics" style={basicsStyle}>
      <p className="Basics__counter">{count}</p>
      <p>
        <button onClick={() => setCount((c) => c - 1)} style={buttonStyle}>
          -
        </button>
        <button onClick={() => setCount((c) => c + 1)} style={buttonStyle}>
          +
        </button>
      </p>
    </div>
  );
}

export default function Basics() {
  return (
    <>
      <BasicsClass />
      <BasicsFunc />
    </>
  );
}
