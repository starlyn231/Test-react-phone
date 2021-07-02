import "./App.css";
import Phone from "./components/Phone";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="container p-4">
      <div className="row">
        <Phone />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
