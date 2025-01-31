import React from "react";
import "../Style/Wallpaper.css";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Wallpaper extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      inputText: "",
      suggestions: [],
    };
  }
  handleLocation = (event) => {
    const locationId = event.target.value;
    sessionStorage.setItem("locationId", locationId);
    console.log(locationId);

    axios({
      method: "GET",
      url: `http://localhost:5000/restaurant`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        this.setState({ restaurants: response.data.restaurants });
      })
      .catch((err) => console.log(err));
  };

  handleSearch = (event) => {
    let inputText = event.target.value;
    const { restaurants } = this.state;

    const suggestions = restaurants.filter((item) =>
      item.name.toLowerCase().includes(inputText.toLowerCase())
    );

    this.setState({ suggestions, inputText });
  };

  showSuggestion = () => {
    const { suggestions, inputText } = this.state;
    console.log(suggestions, inputText);

    if (suggestions.length === 0 && inputText === undefined) {
      console.log("suggestion ki jo length ha vo 0 ha or input undifined ha");
      return null;
    }
    if (suggestions.length > 0 && inputText === "") {
      console.log("suggestion ki length ha but input khali ha");
      return null;
    }
    if (suggestions.length === 0 && inputText) {
      return (
        <ul>
          {console.log("suggestion ha hi nhi or input dedia ha")}
          <li>No Search Results Found</li>
        </ul>
      );
    }

    return (
      <ul className="ul-details">
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => this.selectingRestaurant(item._id)}>
            {`${item.name}  -  ${item.locality}, ${item.city}`}
          </li>
        ))}
      </ul>
    );
  };
  selectingRestaurant = (resId) => {
    this.props.history.push(`/details?restaurants=${resId}`);
  };

  render() {
    const { locationsData } = this.props;
    return (
      <div>
        <header>
          <p className="logo text-center" style={{ fontWeight: "bold" }}>
            e!
          </p>
          <h1 className="text-center">
            Find the best restaurants,cafes and bars
          </h1>
          <div className="container cont1">
            <div className="row">
              <select
                className="col-12 col-lg-5 loaction"
                style={{ width: "34%", marginLeft: "9%" }}
                onChange={this.handleLocation}
              >
                <option className="option1" value="0">
                  Select
                </option>
                {locationsData.map((item) => {
                  return (
                    <option
                      className="option1"
                      key={`${item.location_id}-${item.name}`}
                      value={item.location_id}
                    >
                      {item.name}, {item.city}, {item.country_name}
                    </option>
                  );
                })}
              </select>

              <input
                id="query"
                className="col-12 col-lg-6 search"
                type="search"
                placeholder="search for restaurent"
                style={{ height: "6vh", width: "45%" }}
                onChange={this.handleSearch}
              />
              {this.showSuggestion()}
            </div>
          </div>
        </header>
      </div>
    );
  }
}
export default withRouter(Wallpaper);
