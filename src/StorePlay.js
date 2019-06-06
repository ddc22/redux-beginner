import React from "react";
import "./App.css";
import { createStore } from "redux";

function counter(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}

let store = createStore(counter);
store.subscribe(() => console.log(store.getState()));

class StorePlay extends React.Component {
  state = {
    serializedStoreString: "",
    stateUpdates: []
  };

  componentDidMount() {
    //update
    let storeState = store.getState();
    let stateUpdate = storeState;
    this.setState({
      serializedStoreString: JSON.stringify(stateUpdate),
      stateUpdates: [...this.state.stateUpdates, stateUpdate]
    });

    //Create a listener on store changes
    store.subscribe(() => {
      let storeState = store.getState();
      let serializedStoreString = JSON.stringify(storeState);
      this.setState({
        serializedStoreString,
        stateUpdates: [...this.state.stateUpdates, storeState]
      });
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
          INCREMENT
        </button>
        <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
          DECREMENT
        </button>

        <div>{this.state.serializedStoreString}</div>
        <div>
          <h2>Update History</h2>
          {this.state.stateUpdates.map(state => (
            <div>
              <span>count : </span>
              <span>{state.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default StorePlay;
