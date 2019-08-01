import React, { Component } from "react";
import Validate from "./validate";

export default class Index extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <Validate />
          </div>
        </div>
      </div>
    );
  }
}
