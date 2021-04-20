import React, { Component } from "react";

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  componentDidMount() {
    let { initialValue } = this.props;
    if (initialValue) {
      this.setState({ value: initialValue });
    }
  }

  onChange = (e) => {
    let { id, updateValue } = this.props;
    const value = e.target.value.trim();

    this.setState({ value }, () => {
      if (typeof updateValue == "function") {
        updateValue(id, value);
      }
    });
  };

  render() {
    let {
      type,
      id,
      name,
      className,
      label,
      updateValue,
      ...otherPorps
    } = this.props;
    return (
      <div className="form-group">
        {label && <label htmlFor={id}>{label}</label>}
        <input
          type={type ? type : "text"}
          className="form-control"
          name={name ? name : id}
          id={id}
          onChange={this.onChange}
          {...otherPorps}
        />
      </div>
    );
  }
}
