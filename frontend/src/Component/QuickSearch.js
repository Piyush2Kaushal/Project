import React from "react";
import QuichSearchItem from "./QuickSearchItem";

class QuichSearch extends React.Component {
  render() {
    const { Quickmealtype } = this.props;
    return (
      <div>
        <section>
          <div className="container cont2">
            <h2>Quick Searches</h2>
            <p className="p_1"> Discover restaurants by meal</p>
          </div>

          <div className="bottomSection">
            <div className="container">
              <div
                className="row"
                style={{
                  display: "flex",
                  marginBottom: "2%",
                  flexWrap: "wrap",
                }}
              >
                {Quickmealtype.map((item) => {
                  return <QuichSearchItem QuichSearchItemData={item} />;
                })}
                {/* <QuichSearchItem
                  heading={"Breakfast"}
                  text={"Start Your day with breakfast"}
                  image={"Pics/Photos/Breakfast.jpg"}
                />
                <QuichSearchItem
                  heading={"Launch"}
                  text={"Start Your day with launch option"}
                  image={"Pics/Photos/Lunch.jpg"}
                />
                <QuichSearchItem
                  heading={"Dinner"}
                  text={"End Your day with Dinner option"}
                  image={"Pics/Photos/Dinner.jpg"}
                />
              </div>
              <div className="row" style={{ display: "flex", marginTop: "2%" }}>
                <QuichSearchItem
                  heading={"Drinks"}
                  text={"Enjoy Your day with Drinks option"}
                  image={"Pics/Photos/Drinks.jpg"}
                />
                <QuichSearchItem
                  heading={"Ice Cream"}
                  text={"Enjoy the Quality Ice cream's"}
                  image={"Pics/Photos/IceCream.jpg"}
                />
                <QuichSearchItem
                  heading={"Bakery"}
                  text={"Enjoy Varity of Sweets "}
                  image={"Pics/Photos/Sweets.jpg"}
                /> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default QuichSearch;
