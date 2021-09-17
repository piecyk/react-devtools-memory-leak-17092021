import './index.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {useVirtual} from 'react-virtual'

function App() {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: 20000,
    parentRef,
    estimateSize: React.useCallback(() => 35, []),
  });

  return (
    <div>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `200px`,
          width: `400px`,
          overflow: "auto"
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: "100%",
            position: "relative"
          }}
        >
          {rowVirtualizer.virtualItems.map(virtualRow => (
            <div
              key={virtualRow.index}
              className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              Row {virtualRow.index}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
