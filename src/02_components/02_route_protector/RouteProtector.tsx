import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface RouteProtectorProps {
  Component: React.FC;
}
function RouteProtector(props: RouteProtectorProps) {
  const navigate = useNavigate();
  const { Component } = props;
  const uid = localStorage.getItem("uid");
  useEffect(() => {
    if (!uid) return navigate("/login");
  }, [localStorage]);
  if (uid) return <Component />;
}

export default RouteProtector;
