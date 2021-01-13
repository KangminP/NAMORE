import React, { Component } from "react";

const ImgUpload = ({ onChange, src }) => {
  return (
    <label htmlFor="photo-upload">
      <div>
        <img for="photo-upload" src={src} />
      </div>
      <input id="photo-upload" type="file" onChange={onChange} />
    </label>
  );
};

const Context = ({ onChange, value }) => {
  return (
    <div className="field">
      <label htmlFor="context">Context:</label>
      <textarea
        id="context"
        type="text"
        onChange={onChange}
        maxlength="30"
        value={value}
        placeholder="내용을을 입력해주세요."
        required
      />
    </div>
  );
};

const SubStep = ({ onSubmit, src, context }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          <div>
            <img for="photo-upload" src={src} />
          </div>
        </label>
        <div c>{context}</div>
        <button type="submit">Edit Step </button>
      </form>
    </div>
  );
};

const Edit = ({ onSubmit, children }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        {children}
        <button type="submit">Save </button>
      </form>
    </div>
  );
};

class AddStepsSub extends Component {
  state = {
    file: "",
    imagePreviewUrl:
      "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true",
    context: "",
    active: "edit",
  };

  photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  editContext = (e) => {
    const context = e.target.value;
    this.setState({
      context,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let activeP = this.state.active === "edit" ? "step" : "edit";
    this.setState({
      active: activeP,
    });
    // console.log(this.state.context);
  };

  render() {
    const { imagePreviewUrl, context, active } = this.state;
    return (
      <div>
        {active === "edit" ? (
          <Edit onSubmit={this.handleSubmit}>
            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl} />
            <Context onChange={this.editContext} value={context} />
          </Edit>
        ) : (
          <SubStep
            onSubmit={this.handleSubmit}
            src={imagePreviewUrl}
            context={context}
          />
        )}
      </div>
    );
  }
}

export default AddStepsSub;
