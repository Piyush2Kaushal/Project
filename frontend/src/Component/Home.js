import React from "react";
import axios from "axios";

import "../Style/Home.css";

import Wallpaper from "./Wallpaper";
import QuichSearch from "./QuickSearch";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      mealtype: [],
    };
  }

  componentDidMount() {
    sessionStorage.clear();
    axios({
      method: "GET",
      url: "http://localhost:5000/locations",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        this.setState({ locations: response.data.locations });
      })
      .catch((err) => console.log(err));

    axios({
      method: "GET",
      url: "http://localhost:5000/mealtypes",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        this.setState({ mealtype: response.data.mealtypes });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { locations, mealtype } = this.state;
    console.log(locations);

    return (
      <div>
        <Wallpaper locationsData={locations} />
        <QuichSearch Quickmealtype={mealtype} />
      </div>
    );
  }
}

export default Home;
