import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes";

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;