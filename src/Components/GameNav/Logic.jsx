import React from "react";

class Logic extends React.Component {
  getHungry = () => {
    if (this.props.monster.hunger > 0) {
      this.props.computerUpdateStat("hunger");
    }
  };

  loseStrength = () => {
    if (this.props.monster.strength > 0) {
      this.props.computerUpdateStat("strength");
    }
  };

  computerMakePoop = () => {
    if (this.props.monster.level !== "Egg" && this.props.monster.poop < 4) {
      this.props.computerMakePoop("poop");
    }
  };

  computerMakeSick = () => {
    if (this.props.monster.poop === 4) {
      this.props.computerMakeSick("sick");
    }
  };

  makeMonsterOlder = () => {
    if (this.props.monster.level === "Egg") {
      this.props.makeMonsterEvolve("Baby");
    } else {
      this.props.makeMonsterOlder("age");
      this.makeMonsterEvolve();
    }
  };

  // 'Egg', 'Baby', 'Training', 'Rookie', 'Champion', 'Ultimate'

  makeMonsterEvolve = () => {
    switch (this.props.monster.level) {
      case "Baby":
        this.props.monster.age >= 2 && this.props.makeMonsterEvolve("Training");
        break;
      case "Training":
        this.props.monster.age >= 4 && this.props.makeMonsterEvolve("Rookie");
        break;
      case "Rookie":
        this.props.monster.age >= 6 && this.props.makeMonsterEvolve("Champion");
        break;
      case "Champion":
        this.props.monster.age >= 8 && this.props.makeMonsterEvolve("Ultimate");
        break;
      default:
    }
  };

  componentDidMount() {
    setInterval(this.getHungry, 3000);
    setInterval(this.loseStrength, 3000);
    setInterval(this.computerMakePoop, 3000);
    setInterval(this.computerMakeSick, 3000);
    setInterval(this.makeMonsterOlder, 5000);
    // setInterval(this.makeMonsterEvolve, 10000);
  }

  render() {
    return <></>;
  }
}

export default Logic;
