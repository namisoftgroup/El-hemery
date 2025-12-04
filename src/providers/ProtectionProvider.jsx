import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

function ProtectionProvider({ children }) {
  const navigate = useNavigate();
  const { loading, isAuthed } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthed) {
      navigate("/signin", { replace: true });
    }
  }, [loading, isAuthed, navigate]);

  if (loading || !isAuthed) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectionProvider;
