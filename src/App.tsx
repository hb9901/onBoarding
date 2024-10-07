import { CookiesProvider } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App() {
  return (
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  );
}

export default App;
