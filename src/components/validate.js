import React, { Component } from "react";
const axios = require("axios");

export default class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlResults: [],
      key: "",
      inUrl: false,
      /*endpoint: '',
      datasource: '',
      searchApplication: ''*/
    };

    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({
      message: "Sending..."
    });
    this.setState({
      showMessage: true
    });


    var urls = this.state.urls.split(/\r?\n/);

    for (let i = 0; i < urls.length; i++) {

      let query = this.state.inUrl ? "inurl:" + urls[i] : urls[i];

      await axios
        .post(this.state.endpoint, {
          requestOptions: {
            searchApplicationId: this.state.searchApplication
          },
          dataSourceRestrictions: [
            {
              source: {
                name: this.state.datasource
              }
            }
          ],
          query,
          pageSize: 10
        })
        .then(res => {

          let results = 0; //
          if (res.data.resultCountExact !== undefined) {
            results = res.data.resultCountExact;
          } else {
            results = res.data.resultCountEstimate;
          }


          this.setState(prevState => ({
            urlResults: [
              ...prevState.urlResults,
              {
                key: "1",
                query: urls[i],
                results,
                inUrl: this.state.inUrl
              }
            ]
          }));

          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

    }
  }

  updateInput(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ 
      [target.name]: value
    });
  }

  render() {
    return (
      <div>

        <h4> Validate URLs </h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Search Application: </label>
            <input
              type="text"
              className="form-control"
              placeholder="searchapplications/93c2ff230ab8885dc9e0799e60e6ea1"
              name="searchApplication"
              value={this.state.searchApplication}
              onChange={this.updateInput}
            />
          </div>
          <div className="form-group">
            <label>Datasource: </label>
            <input
              type="text"
              className="form-control"
              placeholder="datasources/93c2ff7230ab888574e47d59324d7aec"
              name="datasource"
              value={this.state.datasource}
              onChange={this.updateInput}
            />
          </div>
          <div className="form-group">
            <label>Search Endpoint: </label>
            <input
              type="text"
              className="form-control"
              placeholder="https://proxy.appspot.com/query/search"
              name="endpoint"
              value={this.state.endpoint}
              onChange={this.updateInput}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="inUrl"
              value={this.state.inUrl}
              onChange={this.updateInput}
              id="exampleCheck1"
            />
            <label className="form-check-label">
              enable inurl
            </label>
          </div>
          <hr />
          <div className="form-group pull-right pt-4">
            <label>Search terms or URLs: </label>
            <textarea
              type="text"
              rows="5"
              name="urls"
              onChange={this.updateInput}
              className="search form-control"
              placeholder="Paste or type your urls (one url per row)"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Validate"
              className="btn btn-secondary"
            />
          </div>
          {this.state.showMessage && (
            <div className="alert alert-success" role="alert">
              processing...
            </div>
          )}
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Query</th> 
              <th scope="col">Results</th>
            </tr>
          </thead>
          <tbody>
            {this.state.urlResults.map(keyMatch => (
              <React.Fragment>
                <tr>
                {keyMatch.inUrl ? (
        <td><a target="_blank" rel="noopener noreferrer" href={'//'.concat(keyMatch.query)}>{keyMatch.query}</a></td>
      ) : (
        <td>{keyMatch.query}</td>
      )}
                  
                  <td>{keyMatch.results}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
