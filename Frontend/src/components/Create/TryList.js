import React, { Component } from "react";
import TryStepItem from "./TryStepItem";

class TryList extends Component {
  stepRemove = (id) => {
    this.props.stepRemove(id);
  };

  render() {
    const { datas } = this.props;
    return (
      <div>
        <ul>
          {datas.map((data) => (
            <li>
              <TryStepItem
                key={data.id}
                data={data}
                stepRemove={this.stepRemove}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TryList;
