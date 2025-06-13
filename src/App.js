import Analytics from './components/Analytics';

function App() {
  return (
    <div>
      <nav>
        <a href="/analytics">Analytics</a>
      </nav>
      <Routes>
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
}

export default App;
