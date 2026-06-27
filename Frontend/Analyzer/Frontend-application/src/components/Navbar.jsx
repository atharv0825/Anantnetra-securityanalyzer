import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar sticky-top"
      style={{
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <div className="container py-2">
        <NavLink
          to="/"
          className="navbar-brand fw-bold fs-4 text-dark"
        >
          Security Risk Analyzer
        </NavLink>

        <div className="d-flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-decoration-none fw-semibold ${
                isActive ? "text-primary" : "text-dark"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `text-decoration-none fw-semibold ${
                isActive ? "text-primary" : "text-dark"
              }`
            }
          >
            History
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;