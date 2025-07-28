import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "../src/routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer
        theme="colored"
        position="top-center"
        autoClose={2000}
        hideProgressBar
      />
    </BrowserRouter>
  );
}
