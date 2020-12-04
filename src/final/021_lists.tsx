import React from 'react';

function Products() {
  const [products, setProducts] = React.useState(() => [
    { id: 1, label: 'product#1' },
    { id: 2, label: 'product#2' },
    { id: 3, label: 'product#3' },
    { id: 4, label: 'product#4' },
  ]);

  const updateLabel = (label: string, index: number) => {
    setProducts((list) => {
      const newList = [...list];
      newList[index] = {
        ...newList[index],
        label,
      };
      return newList;
    });
  };

  const removeProduct = (index: number) => {
    setProducts((list) => {
      const newList = [...list];
      newList.splice(index, 1);
      return newList;
    });
  };

  const addProduct = () => {
    setProducts((list) => list.concat([{ id: Date.now(), label: '' }]));
  };

  return (
    <>
      <div>
        <button onClick={addProduct}>+ Add a product</button>
      </div>
      <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
        {products.map((product, index) => (
          <li key={product.id}>
            <p style={{ display: 'flex', alignItems: 'stretch' }}>
              <input
                type="text"
                value={product.label}
                onChange={(event) => updateLabel(event.target.value, index)}
                style={{ lineHeight: '1.5em' }}
              />
              &nbsp;
              <button onClick={() => removeProduct(index)}>✕</button>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function BadKeysUsageExample() {
  const [items, setItems] = React.useState(() => [
    { id: 1, label: 'item#1' },
    { id: 2, label: 'item#2' },
    { id: 3, label: 'item#3' },
    { id: 4, label: 'item#4' },
  ]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const newItems = [...items];
      for (let i = newItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
      }
      setItems(newItems);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [items]);

  return (
    <div style={{ marginTop: '1em', display: 'flex', flexDirection: 'column' }}>
      {items.map((item, index) => (
        <input
          key={index}
          type="text"
          value={item.label}
          style={{ marginTop: '1em' }}
          onChange={() => {}}
        />
      ))}
    </div>
  );
}

export default function Lists() {
  return (
    <>
      <Products />
      <BadKeysUsageExample />
    </>
  );
}
