# React workshop - basics

## Class component

- https://reactjs.org/docs/components-and-props.html#function-and-class-components

```js
class MyComponent extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
```

## Function component

- https://reactjs.org/docs/components-and-props.html#function-and-class-components

```js
function MyComponent() {
  return <div>Hello</div>;
}
```

## React local state

- https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class
- https://reactjs.org/docs/hooks-state.html
- https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly

With a class component:

```js
class MyComponent extends React.Component {
  state = { message: 'Hello' };

  render() {
    return (
      <>
        <h1>{this.state.message}</h1>
        <input
          type="text"
          value={this.state.message}
          onChange={(event) => this.setState({ message: event.target.value })}
        />
      </>
    );
  }
}
```

With a function component:

```js
function MyComponent() {
  const [message, setMessage] = React.useState('Hello');
  return (
    <>
      <h1>{message}</h1>
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.message)}
      />
    </>
  );
}
```
