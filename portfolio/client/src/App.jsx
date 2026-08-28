import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext.jsx';
import BackgroundGlows from './components/common/BackgroundGlows.jsx';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen">
          <BackgroundGlows />
          <div className="relative z-10 flex flex-col min-h-screen">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
