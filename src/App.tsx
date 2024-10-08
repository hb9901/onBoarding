import { CookiesProvider } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import QueryProvider from "./providers/QueryProvider";
import router from "./routes/router";

function App() {
  return (
    <CookiesProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </CookiesProvider>
  );
}

export default App;
