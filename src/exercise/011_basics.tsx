import React from 'react';

/**
 * Create a component which displays a counter initialized to 0
 * Display 2 buttons:
 * The 1st one will decrement the counter
 * The 2nd one will increment the counter
 */

export class BasicsClass extends React.Component {
  render() {
    return null;
  }
}

/**
 * Now do the same logic with a function and React hooks
 *
 * Related documentation:
 * https://reactjs.org/docs/hooks-state.html
 */

export function BasicsFunc() {
  return null;
}

export default function Basics() {
  return (
    <>
      <BasicsClass />
      <BasicsFunc />
    </>
  );
}
