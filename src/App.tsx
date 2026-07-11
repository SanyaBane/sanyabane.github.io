import ModList from "./components/ModList";
import ModDetails from "./components/ModDetails";
import Header from "./components/Header";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-shell">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ModList />} />
            <Route path="/mod/:mod_id" element={<ModDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
