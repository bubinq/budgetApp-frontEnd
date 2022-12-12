import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ManageExpenses } from "./pages/ManageExpenses";
import { Statistics } from "./pages/Statistics";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PrivateGuard } from "./guards/PrivateGuard";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ManageExpenses />}></Route>
        <Route element={<PrivateGuard />}>
          <Route path="/stats" element={<Statistics />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
