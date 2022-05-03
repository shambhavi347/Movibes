import React from "react";
import { YTLogo } from "../Image/Images";

class Searchbar extends React.Component {
  handleChange = (event) => {
    this.setState({
      term: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleFormSubmit(this.state.term);
  };

  render() {
    return (
      <>
        <h2 style={{ textAlign: "center" }}>
          <img
            style={{
              margin: "-50px",
              marginLeft: "100px",
              width: "500px",
              height: "200px",
              justifyContent: "center",
            }}
            src={YTLogo}
            alt="youtube logo"
          ></img>
        </h2>
        <div className="search-bar ui segment">
          <form onSubmit={this.handleSubmit} className="ui form">
            <div
              className="field"
              style={{ justifyContent: "center", width: "500px" }}
            >
              <input
                style={{
                  justifyContent: "center",
                  width: "500px",
                  marginLeft: "100px",
                  border: "2px solid black",
                }}
                onChange={this.handleChange}
                name="video-search"
                type="text"
                placeholder="Search.."
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}
export default Searchbar;
