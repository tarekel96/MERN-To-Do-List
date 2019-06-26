import React from "react";
import { Button } from "reactstrap";

const LogOut = () => {
  return (
    <div
      style={{
        float: "right",
        marginRight: "2rem"
      }}
    >
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

const handleLogout = e => {
  e.preventDefault();
  localStorage.removeItem("token");
};

export default LogOut;
