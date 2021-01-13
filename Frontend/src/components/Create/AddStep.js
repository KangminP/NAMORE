import React, { Component } from "react";

class AddStep extends Component {
  state = {
    mainfile: "",
    mainpreviewURL: "",
  };

  handleFileOnChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let mainfile = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        mainfile: mainfile,
        mainpreviewURL: reader.result,
      });
    };
    reader.readAsDataURL(mainfile);
  };

  render() {
    let main_preview = null;
    if (this.state.file !== "") {
      main_preview = (
        <img className="main_preview" src={this.state.mainpreviewURL}></img>
      );
    }

    return (
      <div style={{ width: "100%" }}>
        {/* <AddStep /> */}
        <input
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          name="mainfile"
          onChange={this.handleFileOnChange}
          style={{ marginBottom: "10px" }}
        ></input>
        <div style={{ width: "40%", height: "40%", marginBottom: "30px" }}>
          {main_preview}
        </div>
        {/* <button onClick={this.addStep} style={{ width: "100%" }}>
          Add step
        </button> */}
      </div>
    );
  }
}

export default AddStep;
