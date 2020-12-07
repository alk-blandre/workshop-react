# React workshop - perf

https://reactjs.org/docs/optimizing-performance.html

## Use production build

For example, use `https://unpkg.com/react@17.0.1/umd/react.production.js` instead of `https://unpkg.com/react@17.0.1/umd/react.development.js`

Or bundle your app with production env: `NODE_ENV=production`

## Expensive re-rendering

Sometimes rendering is slow due to some long tasks or/and because it renders a lot of components.

You can avoid expensive re-rendering/tasks by memoizing props or variables.

- React.memo https://reactjs.org/docs/react-api.html#reactmemo
- React.useMemo https://reactjs.org/docs/hooks-reference.html#usememo
- React.useCallback https://reactjs.org/docs/hooks-reference.html#usecallback

```js
const MyComponent = React.memo((props) => {
  // It won't re-render if props doesn't change

  // It won't be re-processed if props.list doesn't change
  const itemIds = React.useMemo(() => props.list.map((item) => item.id), [
    props.list,
  ]);

  // It won't be re-processed if props.onChange doesn't change
  const onChange = React.useCallback(
    (itemId) => {
      props.onChange(itemId);
    },
    [props.onChange]
  );

  return <AnotherComponent itemIds={itemIds} />;
});

function ParentComponent(props) {
  const [list, setList] = React.useState([]);
  // ... fetch list + setList(listFromResponse)
  return (
    <MyComponent data={props.data} list={list} onChange={props.onChange} />
  );
}
```
