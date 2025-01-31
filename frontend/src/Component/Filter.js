import React from "react";
import "../Style/Filter.css";
import queryString from "query-string";
import axios from "axios";
import { withRouter } from "react-router-dom";
class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      locations: [],
      mealtype: undefined,
      location: undefined,
      cuisine: [],
      lcost: undefined,
      hcost: undefined,
      sort: 1,
      page: 1,
      pageCount: [],
    };
  }
  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    console.log(qs);

    const { mealtype, location } = qs;
    console.log(mealtype);

    const filterObj = {
      mealtype: Number(mealtype),
      location,
    };
    console.log(filterObj);

    axios({
      method: "POST",
      url: "http://localhost:5000/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurants,
          mealtype,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));

    axios({
      method: "GET",
      url: "http://localhost:5000/locations",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        this.setState({ locations: response.data.locations });
      })
      .catch((err) => console.log(err));
  }

  handelsortchange = (sort) => {
    const { mealtype, cuisine, location, lcost, hcost, page } = this.state;

    const filterObj = {
      mealtype: Number(mealtype),
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "http://localhost:5000/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurants,
          sort,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handleCostChange = (lcost, hcost) => {
    const { mealtype, cuisine, location, sort, page } = this.state;

    const filterObj = {
      mealtype: Number(mealtype),
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "http://localhost:5000/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurants,
          lcost,
          hcost,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handelLocation = (event) => {
    const location = event.target.value;

    const { mealtype, cuisine, lcost, hcost, sort, page } = this.state;
    const filterObj = {
      mealtype: Number(mealtype),
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "http://localhost:5000/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurants,
          location,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handelPageChange = (page) => {
    const { mealtype, cuisine, location, lcost, hcost, sort } = this.state;
    const filterObj = {
      mealtype: Number(mealtype),
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "http://localhost:5000/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurants,
          page,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handelCuisineChange = (cuisineId) => {
    const { mealtype, cuisine, location, lcost, hcost, sort, page } =
      this.state;

    const index = cuisine.indexOf(cuisineId);

    if (index === -1) {
      cuisine.push(cuisineId);
    } else {
      cuisine.splice(index, 1);
    }

    const filterObj = {
      mealtype: Number(mealtype),
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "http://localhost:5000/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurants,
          cuisine,
          pageCount: response.data.pageCount,
        });
      })
      .catch((err) => console.log(err));
  };

  handelNavigate = (resId) => {
    this.props.history.push(`/details?restaurants=${resId}`);
  };

  render() {
    const { restaurants, locations, pageCount } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row heading">Breakfast Places in Mumbai</div>
          <div className="row">
            <div className="col-3 col-sm-12 col-md-4 col-lg-3">
              <div className="filterPanel">
                <div className="filterPanelHeading">Filters</div>
                <div className="filterPanelSubHeading">select location</div>
                <select
                  className="locationSelection"
                  onChange={this.handelLocation}
                >
                  <option value="0" className="disabled selected">
                    select location
                  </option>
                  {locations.map((item) => {
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
                <div className="filterPanelSubHeading">cuisine</div>
                <input
                  type="checkbox"
                  className="cuisinOption"
                  onChange={() => this.handelCuisineChange(1)}
                />
                <label>North Indian</label>
                <br />
                <input
                  type="checkbox"
                  className="cuisinOption"
                  onChange={() => this.handelCuisineChange(2)}
                />
                <label>South Indian</label>
                <br />
                <input
                  type="checkbox"
                  className="cuisinOption"
                  onChange={() => this.handelCuisineChange(3)}
                />
                <label>Chinese</label>
                <br />
                <input
                  type="checkbox"
                  className="cuisinOption"
                  onChange={() => this.handelCuisineChange(4)}
                />
                <label>Fast Food</label>
                <br />
                <input
                  type="checkbox"
                  className="cuisinOption"
                  onChange={() => this.handelCuisineChange(5)}
                />
                <label>Street Food</label>
                <br />
                <div className="filterPanelSubHeading">Cost For Two</div>
                <input
                  type="radio"
                  className="cuisinOption"
                  onChange={() => this.handleCostChange(1, 500)}
                  name="Cost"
                />
                <label>less then &#8377;500</label>
                <br />
                <input
                  type="radio"
                  className="cuisinOption"
                  onChange={() => this.handleCostChange(500, 1000)}
                  name="Cost"
                />
                <label>&#8377;500 to &#8377;1000 </label>
                <br />
                <input
                  type="radio"
                  className="cuisinOption"
                  onChange={() => this.handleCostChange(1000, 1500)}
                  name="Cost"
                />
                <label>&#8377;1000 to &#8377;1500 </label>
                <br />
                <input
                  type="radio"
                  className="cuisinOption"
                  onChange={() => this.handleCostChange(1500, 2000)}
                  name="Cost"
                />
                <label>&#8377;1500 to &#8377;2000 </label>
                <br />
                <input
                  type="radio"
                  className="cuisinOption"
                  onChange={() => this.handleCostChange(2000, 50000)}
                  name="Cost"
                />
                <label>&#8377;2000+ </label>
                <br />
                <div className="filterPanelSubHeading">Sort</div>
                <input
                  onChange={() => this.handelsortchange(1)}
                  type="radio"
                  className="cuisinOption"
                  name="price"
                />
                <label>price low to high</label>
                <br />
                <input
                  onChange={() => this.handelsortchange(-1)}
                  type="radio"
                  className="cuisinOption"
                  name="price"
                />
                <label>price high to low</label>
                <br />
              </div>
            </div>
            <div className="col-9 col-sm-12 col-md-8 col-lg-9">
              {console.log(restaurants)}
              {restaurants.length > 0 ? (
                restaurants.map((item) => {
                  return (
                    <div
                      className="resultsPanel"
                      onClick={() => this.handelNavigate(item._id)}
                    >
                      {console.log(item._id)}
                      <div className="row upperSection">
                        <div className="col-2">
                          <img
                            src={`./${item.image}`}
                            alt="not found"
                            className="resultsImage"
                          />
                        </div>
                        <div className="col-10">
                          <div className="resultsHeading">{item.name}</div>
                          <div className="resultsSubHeading">{`locality: ${item.locality}`}</div>
                          <div className="resultsAddress">
                            {`City : ${item.city}`}
                          </div>
                        </div>
                      </div>
                      <hr
                        style={{
                          margin: "1em",
                          width: "100vh",
                          height: "0.4vh",
                        }}
                      />
                      <div className="row lowerSection">
                        <div className="col-2">
                          <div className="resultsAddress">CUISINES:</div>
                          <div className="resultsAddress">COST :</div>
                        </div>
                        <div className="col-10">
                          <div className="resultsSubHeading">
                            {item.cuisine.map((cuisineItem) => {
                              return `${cuisineItem.name}, `;
                            })}
                          </div>
                          <div className="resultsSubHeading">
                            Item Start from &#8377;{item.min_price}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    color: "red",
                    fontSize: "2em",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: "25%",
                  }}
                >
                  {" "}
                  No Restaurants Found.....
                </div>
              )}
              {restaurants.length > 0 ? (
                <div className="pagination">
                  <span className="paginationButton">&laquo;</span>
                  {pageCount.map((pageNo) => {
                    return <span className="paginationButton">{pageNo}</span>;
                  })}
                  <span className="paginationButton">&raquo;</span>
                </div>
              ) : null}
              {/* {pageCount > 0 && restaurants.length > 0 ? (
                <div className="pagination">
               
                  <div
                    className="paginationButton"
                    onClick={() => this.handelPageChange(this.state.page - 1)}
                    style={{
                      cursor: this.state.page > 1 ? "pointer" : "not-allowed",
                    }}
                  >
                    &laquo;
                  </div>

                  {Array.from({ length: pageCount }).map((_, index) => (
                    <div
                      key={index}
                      className={`paginationButton ${
                        this.state.page === index + 1 ? "active" : ""
                      }`}
                      onClick={() => this.handelPageChange(index + 1)}
                    >
                      {index + 1}
                    </div>
                  ))}

                  <div
                    className="paginationButton"
                    onClick={() => this.handelPageChange(this.state.page + 1)}
                    style={{
                      cursor:
                        this.state.page < pageCount ? "pointer" : "not-allowed",
                    }}
                  >
                    &raquo;
                  </div>
                </div>
              ) : null} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Filter);
