# React workshop - intro

## Minimal setup

```html
<body>
  <div id="root"></div>

  <script src="https://unpkg.com/react@17.0.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.development.js"></script>

  <script type="module">
    const hello = React.createElement('h1', { className: 'hello' }, 'Hello');
    ReactDOM.render(hello, document.getElementById('root'));
  </script>
</body>
```

```js
/**
 * @param {string} type - A DOM element type (div, span, input...) or a React component
 * @param {object} props - Props object to pass to the element (className, value...)
 * @param {...React.Node=} children - Optional valid React nodes (null, string, React element...)
 */
React.createElement(type, props, ...children);
```

## JSX

JSX is syntactic sugar which can be converted to interpretable javascript with Babel or Typescript

```html
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@17.0.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.12.4/babel.js"></script>

  <script type="text/babel">
    const hello = <div className="hello">Hello!</div>;
    ReactDOM.render(hello, document.getElementById('root'));
  </script>
</body>
```

Don't do that ☝️ in production 🤓

Use `@babel/preset-react` or Typescript with a bundler such as Webpack or Rollup

- https://babeljs.io/docs/en/babel-preset-react
- https://webpack.js.org/guides/typescript/

If you want to quickly bootstrap a React project: use `create-react-app`

cf. https://create-react-app.dev/docs/getting-started

```bash
npm init react-app my-react-js-app
npm init react-app my-react-ts-app --use-npm --template typescript
```

## Components

There are 2 ways to write a component,

with a class:

```js
class MyComponent extends React.Component {
  render() {
    return <h1>Hello!</h1>;
  }
}
```

with a function:

```js
function MyComponent() {
  return <h1>Hello!</h1>;
}
```

then it can be rendered by ReactDOM:

```js
ReactDOM.render(<MyComponent />, document.getElementById('root'));

// which is equivalent to:
ReactDOM.render(
  React.createElement(MyComponent),
  document.getElementById('root')
);
```

⚠️ Components must be written with a first upper-case letter
