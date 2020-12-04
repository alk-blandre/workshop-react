import React from 'react';
import './App.css';
import logo from './logo.svg';
import Basics from './exercise/011_basics';
import Lists from './exercise/021_lists';
import Hooks from './exercise/033_hooks';

function NavButton({
  view,
  selectedView,
  onSetView,
}: {
  view: string;
  selectedView: string;
  onSetView: (view: string) => void;
}) {
  return (
    <button
      onClick={() => onSetView(view)}
      data-selected={selectedView === view}
      style={{ textTransform: 'capitalize' }}
    >
      {view}
    </button>
  );
}

function App() {
  const [view, setView] = React.useState(
    () =>
      /view=(?<view>\w+)/.exec(document.location.search)?.groups?.view ||
      'basics'
  );

  const views: { [key: string]: () => JSX.Element | null } = {
    basics: () => <Basics />,
    lists: () => <Lists />,
    hooks: () => <Hooks />,
  };

  React.useEffect(() => {
    window.history.pushState({}, '', `/?view=${view}`);
  }, [view]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {Object.keys(views).map((key) => (
          <NavButton
            key={key}
            view={key}
            selectedView={view}
            onSetView={setView}
          />
        ))}
      </header>
      <section>{view in views ? views[view]() : null}</section>
    </div>
  );
}

export default App;
