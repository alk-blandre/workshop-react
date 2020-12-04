# React workshop - lists and keys

https://reactjs.org/docs/lists-and-keys.html

```js
function MyComponent({ products }) {
  return <>{products.map((product) => product.name)}</>;
}
```

## Keys

https://reactjs.org/docs/lists-and-keys.html#keys

> Keys help React identify which items have changed, are added, or are removed.
> Keys should be given to the elements inside the array to give the elements a stable identity.

> Keys used within arrays should be unique among their siblings.
> However they don’t need to be globally unique. We can use the same keys when we produce two different arrays.
