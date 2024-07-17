import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import Catalogue from './components/Catalogue';
import Filter from './components/Filter';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <DataProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/filter" element={<Filter />} />
          <Route path="/" element={<Catalogue />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
