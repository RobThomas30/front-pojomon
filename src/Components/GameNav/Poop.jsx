import React from "react";

const Poop = (props) => {

  // {...updateServer()}

  return (
    <>
      <div>
        <button onClick={props.removePoop} >POOP</button>
      </div>
    </>
  );
};

export default Poop;