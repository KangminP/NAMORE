import React, { Component } from "react";

class TryStepItem extends Component {
  stepRemove = () => {
    this.props.stepRemove(this.props.data.id);
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <div>{data.imagePreviewUrl}</div>
        <div>{data.content}</div>
        <button onClick={this.stepRemove}>삭제</button>
      </div>
    );
  }
}

export default TryStepItem;
