import React  from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';

const ReportsApp = React.lazy(
  () => import('reports/App' as string)
);
const SchedulesApp = React.lazy(
  () => import('Schedules/App' as string)
);

const App = () => (
  <div className="App">
    <h2>Hi from Root App</h2>
    <React.Suspense fallback='Loading...'>
      <ErrorBoundary>
        <ReportsApp />
      </ErrorBoundary>
      <ErrorBoundary>
        <SchedulesApp />
      </ErrorBoundary>
    </React.Suspense>
  </div>
);
export default App;
