import React from "react";
import './MenuItem.css'

function MenuItem({ title, active, onClick }) {
  return (
    <div>
      <span className={`menu ${!active?"active":''}`}>{title}</span>
    </div>
  );
}

export default MenuItem;
