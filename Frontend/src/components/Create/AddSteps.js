import React, { Component } from "react";
import AddStepsSub from "./AddStepsSub";

class AddSteps extends Component {
  state = { inputs: ["input-0"] };

  appendInput = () => {
    var newInput = `input-${this.state.inputs.length}`;
    this.setState((prevState) => ({
      inputs: prevState.inputs.concat([newInput]),
    }));
  };

  render() {
    return (
      <div>
        <div id="dynamicInput">
          {this.state.inputs.map((input) => (
            <div>
              <AddStepsSub key={input} />
            </div>
          ))}
        </div>

        <button onClick={() => this.appendInput()}>ADD</button>
      </div>
    );
  }
}

export default AddSteps;
