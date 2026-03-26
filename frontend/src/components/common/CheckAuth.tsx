import { Navigate, useLocation } from "react-router-dom";

type User = {
  id: string;
  name: string;
  role: string;
};
type CheckAuthProps = {
  isAuthenticated: boolean;
  user: User | null;
  children: React.ReactNode;
};

const CheckAuth = ({ isAuthenticated, user, children }: CheckAuthProps) => {
  const location = useLocation();
  console.log("AUTH STATE:", isAuthenticated, user, location.pathname);
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
     return user?.role === "admin"
    ? <Navigate to="/admin/dashboard" replace />
    : <Navigate to="/shop" replace />;
  }
// Simple analogy
// without replace → add new page to history
// with replace → overwrite current page
//👉 replace = “don’t let user go back to this page”
// 👉 Back button WON’T go to login again ✔️

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
