import React from "react";
import { withRouter } from "react-router-dom";

class QuichSearchItem extends React.Component {
  handelClick = (mealtypeId) => {
    const locationId = sessionStorage.getItem("locationId");
    if (locationId) {
      this.props.history.push(
        `/filter?mealtype=${mealtypeId} &location=${locationId}`
      );
    } else {
      this.props.history.push(`/filter?mealtype=${mealtypeId}`);
    }
  };
  render() {
    const { name, content, image, meal_type } = this.props.QuichSearchItemData;
    return (
      <>
        <div
          className="col-sm-12 col-md-6 col-xl-4 "
          onClick={() => this.handelClick(meal_type)}
        >
          <div className="card mb-3" style={{ maxWidth: "540px;" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={`./${image}`}
                  className="img-fluid card-img p-1 rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{content}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(QuichSearchItem);
