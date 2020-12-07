import React from 'react';

interface Item {
  id: number;
  label: string;
  description: string;
}

const items: Item[] = [];
while (items.length < 500) {
  const id = items.length + 1;
  items.push({ id, label: `item #${id}`, description: `Description #${id}` });
}

/**
 * Optimize rendering performance
 * Everytime you click on an item: it's slow
 */

const List = ({
  items,
  onSelect,
}: {
  items: Item[];
  onSelect: (item: Item) => void;
}) => {
  console.log('render List');
  const localItems = items.map((item) => {
    // simulating a long task
    const longProcessArray = [];
    while (longProcessArray.length < 100000) {
      longProcessArray.push(0);
    }
    return item;
  });
  return (
    <ul style={{ height: '100%', overflow: 'auto' }}>
      {localItems.map((item) => (
        <li
          key={item.id}
          onClick={() => onSelect(item)}
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: '0.5em',
          }}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

function Preview({ item }: { item?: Item }) {
  console.log('render Preview');
  return (
    <div style={{ minWidth: '8em', marginLeft: '1em' }}>
      <h2>{item?.label}</h2>
      <p>{item?.description}</p>
    </div>
  );
}

export default function Perf() {
  console.log('render Perf');
  const [selected, setSelected] = React.useState<any>(null);
  const onSelect = (item: Item) => setSelected(item);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        height: '80vh',
        textAlign: 'left',
      }}
    >
      <List items={items} onSelect={onSelect} />
      <Preview item={selected} />
    </div>
  );
}
