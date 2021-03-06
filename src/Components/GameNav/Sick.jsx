import React from "react";
import healButton from "../../Assets/icons/healbutton.gif";

const Sick = (props) => {
  const cureSick = () => {
    const walkAgain = (walkName) => {
      const monsterName = {
        Botomon: "boto",
        Koromon: "koro",
        Agumon: "agu",
        Greymon: "grey",
        MetalGreymon: "metGrey",
      };
      return monsterName[walkName];
    };

    if (props.monster.death !== 0) {
      props.monster.sick = false;
      props.monster.image = `${walkAgain(props.monster.name)}Walk`;
      props.updateState(props.monster);
    }
  };

  return (
    <>
      <div>
        <img src={healButton} alt="" onClick={cureSick}></img>
      </div>
    </>
  );
};

export default Sick;
