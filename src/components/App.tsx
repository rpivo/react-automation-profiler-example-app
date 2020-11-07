import React from 'react';
import ProblemChild from './ProblemChild';

import { AutomationProfiler } from 'react-automation-profiler';

export default function() {
  return (
    <AutomationProfiler id='p-app'>
      <div id='app'>
        <ProblemChild />
        <button>Click Me.</button>
      </div>
    </AutomationProfiler>
  );
}
