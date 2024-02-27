import {} from "react";
import { Header, Routers } from "@export";
import { useLocation } from "react-router-dom";

function App() {
  const getLocation = useLocation();
  const LoginPath = getLocation.pathname === "/login";
  return (
    <>
      <main>
        {!LoginPath && <Header />} <Routers />
      </main>
    </>
  );
}

export default App;
