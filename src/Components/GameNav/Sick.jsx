import React from "react";

const Sick = (props) => {

  // {...updateServer()}

  return (
    <>
      <div>
        <button onClick={props.healSick} >HEAL</button>
      </div>
    </>
  );
};

export default Sick;