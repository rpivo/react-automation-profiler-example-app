import React from 'react';
import ProblemChild from './ProblemChild';

import { AutomationProfiler } from 'react-automation-profiler';

export default function() {
  const [count, setCount] = React.useState(0);
  function handleClick() {
    setCount(count + 1);
  }

  return (
    <AutomationProfiler id='p-app'>
      <div id='app'>
        <ProblemChild count={count} />
        <button id='button' onClick={handleClick}>Click Me.</button>
      </div>
    </AutomationProfiler>
  );
}
