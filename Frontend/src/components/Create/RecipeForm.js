import React, { Component } from "react";

import { Row, Col } from "reactstrap";

class RecipeForm extends Component {
  constructor(props) {
    super();
    this.state = {
      recipeImage: "",
      recipeImagePreviewUrl: "",
      recipeName: "",
      recipeSheep: "",
      recipeTime: "",
      recipeDifficulty: "",
      // recipeIngre: [{ name: "" }],
      // recipeSteps: [
      //   { step_image: "", step_image_preview: "", step_summary: "" },
      // ],
      recipeIngre: [],
      recipeSteps: [],
    };
    //   recipeImage: "",
    //   recipeName: "",
    //   recipeSheep: "",
    //   recipeTime: "",
    //   recipeDifficulty: "",
    //   recipeIngre: "",
    //   recipeOrder: [],
    //   recipeOrderImage: [],
    //   recipeContent: [],
    //   customRating: 0,
    //   recipeRating: "",
    //   recipeComment: [],
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleIngredientNameChange = (e, ingredientIndex) => {
    let newIngredientName = e.target.value;
    this.setState((prev) => {
      return {
        ...prev,
        recipeIngre: prev.recipeIngre.map((ingredient, index) => {
          if (index == ingredientIndex) {
            return { ...ingredient, name: newIngredientName };
          }
          return ingredient;
        }),
      };
    });
  };

  addIngredientInputs = () => {
    this.setState((prev) => {
      return {
        ...prev,
        recipeIngre: [...prev.recipeIngre, { name: "" }],
      };
    });
  };

  removeIngredientInput = (e, ingredientIndex) => {
    e.preventDefault();
    this.setState({
      recipeIngre: this.state.recipeIngre.filter(
        (ingredient, removedIngredient) => removedIngredient !== ingredientIndex
      ),
    });
  };

  renderIngredientInputs = () => {
    return this.state.recipeIngre.map((ingredient, index) => {
      return (
        <div key={index} className="form-group">
          <input
            className="form-control"
            id="text"
            value={this.state.recipeIngre[index].name}
            onChange={(e) => this.handleIngredientNameChange(e, index)}
            placeholder="재료를 입력해주세요."
            name="ingre_name"
          />
          <button
            className="btn btn-secondary"
            type="button"
            onClick={(e) => this.removeIngredientInput(e, index)}
          >
            Delete
          </button>
        </div>
      );
    });
  };

  addStepInputs = () => {
    this.setState((prev) => {
      return {
        ...prev,
        recipeSteps: [
          ...prev.recipeSteps,
          { step_image: "", step_image_preview: "", step_summary: "" },
        ],
      };
    });
  };

  removeStepInput = (e, stepIndex) => {
    e.preventDefault();
    this.setState({
      recipeSteps: this.state.recipeSteps.filter(
        (step, removedStep) => removedStep !== stepIndex
      ),
    });
  };

  renderStepInputs = () => {
    // console.log(this.state.recipeSteps[0]);
    // let temp = this.state.recipeSteps;
    // console.log(temp);
    // let step_preview = null;
    // if (temp.step_image !== "") {
    //   step_preview = (
    //     <img className="step_preview" src={temp.step_image_preview}></img>
    //   );
    // }
    return this.state.recipeSteps.map((step, index) => {
      return (
        <div key={index} className="form-group">
          <Row>
            <Col>
              <input
                type="file"
                accept="image/jpg,impge/png,image/jpeg,image/gif"
                name="step_img"
                className="form-control"
                onChange={(e) => this.handleStepFileOnChange(e, index)}
              />
              {/* {step_preview} */}
              <img
                className="step_preview"
                src={this.state.recipeSteps[index].step_image_preview}
              ></img>
            </Col>
            <Col>
              <textarea
                placeholder={`Step${index + 1}`}
                name="rec_steps"
                id="textArea"
                className="form-control"
                onChange={(e) => this.handleStepChange(e, index)}
                value={step.step_summary}
              />
              <button
                className="btn btn-secondary"
                type="button"
                onClick={(e) => this.removeStepInput(e, index)}
              >{`Delete Step ${index + 1}`}</button>
            </Col>
          </Row>
        </div>
      );
    });
  };

  handleStepChange = (e, stepIndex) => {
    let newStep = e.target.value;
    this.setState((prev) => {
      return {
        ...prev,
        recipeSteps: prev.recipeSteps.map((step, index) => {
          if (index == stepIndex) {
            return {
              ...step,
              step_summary: newStep,
            };
          }
          return step;
        }),
      };
    });
  };

  handleStepFileOnChange = (e, stepIndex) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState((prev) => {
        return {
          ...prev,
          recipeSteps: prev.recipeSteps.map((step, index) => {
            if (index == stepIndex) {
              return {
                ...step,
                step_image: file,
                step_image_preview: reader.result,
              };
            }
            return step;
          }),
        };
      });
    };
    reader.readAsDataURL(file);
  };

  handleFileOnChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        recipeImage: file,
        recipeImagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  handleSumbit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    let main_preview = null;
    if (this.state.recipeImage !== "") {
      main_preview = (
        <img
          className="main_preview"
          src={this.state.recipeImagePreviewUrl}
        ></img>
      );
    }
    return (
      <div>
        <form onSubmit={this.handleSumbit}>
          <div className="form-group">
            <label htmlFor="inputDefault">Title</label>
            <input
              className="form-control"
              type="inputDefault"
              name="recipeName"
              id="inputDefault"
              placeholder="Enter title"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label>MainImage</label>
            <input
              type="file"
              name="main_img"
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              onChange={this.handleFileOnChange}
            />
            {main_preview}
          </div>
          <div className="form-group">
            <label htmlFor="text">Ingredients</label>
            {this.renderIngredientInputs()}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.addIngredientInputs()}
            >
              + Add Ingredient
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="textArea">Steps</label>
            {this.renderStepInputs()}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.addStepInputs()}
            >
              + Add Step
            </button>
          </div>
          <input type="submit" className="btn btn-secondary"></input>
        </form>
      </div>
    );
  }
}

export default RecipeForm;
