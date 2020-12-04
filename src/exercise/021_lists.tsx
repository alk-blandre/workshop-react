import React from 'react';

/**
 * Render a list of inputs
 * Values are product labels
 * Product label are editable
 * We can add a new product
 * We can delete products
 */

export default function Lists() {
  const [products] = React.useState(() => [
    { id: 1, label: 'product#1' },
    { id: 2, label: 'product#2' },
    { id: 3, label: 'product#3' },
    { id: 4, label: 'product#4' },
  ]);
  return <ul>{JSON.stringify(products)}</ul>;
}
