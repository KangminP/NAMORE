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

const Title = ({ onChange, value }) => {
  return (
    <div className="field">
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        onChange={onChange}
        maxlength="30"
        value={value}
        placeholder="제목을 입력해주세요."
        required
      />
    </div>
  );
};

const MainTitle = ({ onSubmit, src, title }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          <div>
            <img for="photo-upload" src={src} />
          </div>
        </label>
        <div c>{title}</div>
        <button type="submit">Edit Main </button>
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

class Addmain extends Component {
  state = {
    file: "",
    imagePreviewUrl:
      "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true",
    title: "",
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

  editTitle = (e) => {
    const title = e.target.value;
    this.setState({
      title,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let activeP = this.state.active === "edit" ? "main" : "edit";
    this.setState({
      active: activeP,
    });
    // console.log(this.state.title);
  };

  render() {
    const { imagePreviewUrl, title, active } = this.state;
    return (
      <div>
        {active === "edit" ? (
          <Edit onSubmit={this.handleSubmit}>
            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl} />
            <Title onChange={this.editTitle} value={title} />
          </Edit>
        ) : (
          <MainTitle
            onSubmit={this.handleSubmit}
            src={imagePreviewUrl}
            title={title}
          />
        )}
      </div>
    );
  }
}

export default Addmain;
