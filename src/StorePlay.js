import React from "react";
import "./App.css";
import { createStore } from "redux";

//The reducer to handle counter operations
function counterReducer(state = { count: 0 }, action) {
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

//This is where we give birth to our store
//We have to provide the store with the reducer which provides the logic on how 
//the new store state will look like.
let store = createStore(counterReducer);

//The store can have any amount of subscribers
store.subscribe(() => console.log(store.getState()));

class StorePlay extends React.Component {
  state = {
    serializedStoreString: "",
    stateUpdates: []
  };

  componentDidMount() {
    //Create a listener on store changes
    //Set local component state based on the store state 
    //The store state is published on each action
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
        {/* Here on click I'm dispatching an action to the store */}
        <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
          INCREMENT
        </button>
        <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
          DECREMENT
        </button>
        <button onClick={() => store.dispatch({ type: "NONE" })}>
          DUMB
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
