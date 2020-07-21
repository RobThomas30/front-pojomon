import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();

  return (
    <nav>
      <Link to="/help">Help</Link>

      <span
        onClick={() => {
          localStorage.removeItem("token");
          history.push("/login");
        }}
      >
        Logout
      </span>
    </nav>
  );
};

export default NavBar;