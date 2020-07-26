import React from "react";
import { Redirect } from "react-router-dom";
import Stats from "./GameNav/Stats";
import Feed from "./GameNav/Feed";
import Poop from "./GameNav/Poop";
import Sick from "./GameNav/Sick";
import Logic from "./GameNav/Logic";

class GameMonster extends React.Component {
  state = { monster: null, current_user: null, shouldUpdate: false, dieRedirect: false, };
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
        current_user: data.current_user,
      });
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
  }

  async componentDidUpdate() {
    if (this.state.shouldUpdate) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/monsters/${this.state.monster.id}`,
          {
            method: "PUT",
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
          shouldUpdate: false,
        });
      } catch (err) {
        this.setState({
          errMessage: err.message,
          shouldUpdate: false,
        });
      }
    }
  }

  userUpdateStat = (statType) => {
    this.setState((state) => {
      return {
        monster: {
          [statType]: (state.monster[statType] += 1),
          ...state.monster,
        },
        shouldUpdate: true,
      };
    });
  };

  userCleanPoop = () => {
    this.setState((state) => {
      return {
        monster: {
          poop: (state.monster.poop = 0),
          ...state.monster,
        },
        shouldUpdate: true,
      };
    });
  };

  userHealSick = () => {
    this.setState((state) => {
      return {
        monster: {
          sick: (state.monster.sick = false),
          ...state.monster,
        },
        shouldUpdate: true,
      };
    });
  };

  updateState = (newState, boolean) => {
    this.setState({ 
      monster: newState, 
      shouldUpdate: true,
      dieRedirect: boolean,
    })
  }

  render() {
    let dieRedirect = this.state.dieRedirect;
    const monster = this.state?.monster;
    const user = this.state?.current_user;
    
    return (
      <>
        {monster && <Stats monster={monster} user={user} />}
        {monster && (
          <Feed
            monster={monster}
            updateHunger={this.userUpdateStat}
            updateStrength={this.userUpdateStat}
          />
        )}
        {monster && (
          <Poop
            monster={monster}
            removePoop={() => {
              this.userCleanPoop("poop");
            }}
          />
        )}
        {monster && (
          <Sick
            monster={monster}
            healSick={() => {
              monster.sick = false;
              this.userHealSick("sick");
            }}
          />
        )}

        {monster && (
          <Logic
            monster={monster}
            dieRedirect={dieRedirect}
            updateState={this.updateState}
          />
        )}

        {dieRedirect && <Redirect to="/death" />}
      </>
    );
  }
}

export default GameMonster;
