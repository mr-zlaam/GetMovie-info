import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.scss";
import Container from "./01_container/container.tsx";
import { Provider } from "@export";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
const queryClient: QueryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Container>
            <App />
          </Container>
        </Router>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
