import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '/pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;   