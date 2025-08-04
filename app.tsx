import { HashRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Mastermind />} />
        </Routes>
    </Router>
  );
};

export default App;
