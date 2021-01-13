import React, { Component } from "react";

import { Row, Col } from "reactstrap";

import ImageUploading from "react-images-uploading";

import "./SubAddStep.css";

class SubAddStep extends Component {
  state = {
    images: [],
  };
  // const [images, setImages] = useState([]);

  onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    // setImages(imageList);
    this.setState({
      images: imageList,
    });
  };

  render() {
    const maxNumber = 10;
    return (
      <div style={{ width: "100%" }}>
        <ImageUploading
          multiple
          value={this.state.images}
          onChange={this.onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              &nbsp;
              <button onClick={onImageRemoveAll}>Remove all images</button>
              {imageList.map((image, index) => (
                <Row>
                  <div key={index} className="image-item">
                    <Col>
                      <img src={image.data_url} alt="" width="100%" />
                    </Col>
                    <Col>
                      <textarea
                        style={{ width: "100%" }}
                        // value={contexts}
                        onChange={(e) => {
                          // console.log(e.target.value);
                        }}
                      ></textarea>
                    </Col>
                    <Col>
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>
                          Update
                        </button>
                        <button onClick={() => onImageRemove(index)}>
                          Remove
                        </button>
                      </div>
                    </Col>
                  </div>
                </Row>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
    );
  }
}

export default SubAddStep;
