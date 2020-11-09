import React from 'react';

import { AutomationProfiler } from 'react-automation-profiler';

const MemoizedCountButton = React.memo(({ count, id, onClick }: {
  count: number;
  id: string;
  onClick: () => void;
}) =>
  <AutomationProfiler id='p-memo-button'>
    <button id={id} onClick={onClick}>{count}</button>
  </AutomationProfiler>
);

const CountButton = ({ count, id, onClick }: {
  count: number;
  id: string;
  onClick: () => void;
}) =>
  <AutomationProfiler id='p-button'>
    <button id={id} onClick={onClick}>{count}</button>
  </AutomationProfiler>;

/* comment out CountButton above and comment in CountButton 
below to see how React.memo() affects renders */

// const CountButton = React.memo(({ count, id, onClick }: {
//   count: number;
//   id: string;
//   onClick: () => void;
// }) =>
//   <AutomationProfiler id='p-button'>
//     <button id={id} onClick={onClick}>{count}</button>
//   </AutomationProfiler>
// );

function DualCounter() {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  const callbackIncrement = React.useCallback(() => setCount1(count => count + 1), []);

  const increment = () => setCount2(count => count + 1);

  /* comment out increment above and comment in increment 
  below to see how React.useCallback() affects renders */

  // const increment = React.useCallback(() => setCount2(count => count + 1), []);

  return (
    <>
      <MemoizedCountButton count={count1} onClick={callbackIncrement} id='memoized-button' />
      <CountButton count={count2} onClick={increment} id='button' />
    </>
  )
}

export default function () {
  return (
    <AutomationProfiler id='p-app'>
      <div id='app'>
        <DualCounter />
      </div>
    </AutomationProfiler>
  );
}
