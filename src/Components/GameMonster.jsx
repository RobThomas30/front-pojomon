import React from "react";
import Stats from "./GameNav/Stats";
import Feed from "./GameNav/Feed";
import Poop from "./GameNav/Poop";
import Sick from "./GameNav/Sick";

class GameMonster extends React.Component {
  state = {monster: null, current_user: null, shouldUpdate: false}
  async componentDidMount() {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/monsters/current`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      this.setState({ 
        monster: data.monster,
        current_user: data.current_user 
      });
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
  }

  
  // oneMin = () => {
  //   // #invoke fetch every 1 min
  // }

  async componentDidUpdate() {
    if(this.state.shouldUpdate) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/monsters/${this.state.monster.id}`,
          {
            method: 'PUT',
            headers: {
              "Content-type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ monster: this.state.monster }),
          }
        );
        const updatedData = await response.json();
        this.setState({ 
          monster: updatedData.monster,
          current_user: updatedData.current_user,
          shouldUpdate: false
        });
      } catch (err) {
        this.setState({
          errMessage: err.message,
          shouldUpdate: false
        });
      }
    }
  }

  render() {
    const monster = this.state?.monster;
    const user = this.state?.current_user;
    return (
      <>
        {monster && <Stats monster={monster} user={user} />}

        {monster && <Feed 
          monster={monster}
          updateHunger={()=>{
            monster.hunger += 1
            this.setState({ monster: monster })
            this.setState({ shouldUpdate: true })
          }}
          updateStrength={()=>{
            monster.strength += 1
            this.setState({ monster: monster })
            this.setState({ shouldUpdate: true })
          }}
        />}

        {monster && <Poop 
          monster={monster}
          removePoop={()=>{
            monster.poop = 0
            this.setState({ monster: monster })
            this.setState({ shouldUpdate: true })
          }}
        />}

        {monster && <Sick 
          monster={monster}
          healSick={()=>{
            monster.sick = false
            this.setState({ monster: monster })
            this.setState({ shouldUpdate: true })
          }}
        />}
      </>
    );
  }
}

export default GameMonster;
