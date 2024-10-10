import { CookiesProvider } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import QueryProvider from "./providers/QueryProvider";
import ToastProvider from "./providers/ToastProvider";
import router from "./routes/router";

function App() {
  return (
    <CookiesProvider>
      <QueryProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </QueryProvider>
    </CookiesProvider>
  );
}

export default App;
