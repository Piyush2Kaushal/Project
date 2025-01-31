import React from "react";
import axios from "axios";
import queryString from "query-string";
// import Modal from 'react-modal';
import "../Style/Details.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Modal from "react-modal";

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//         backgroundColor: 'antiquewhite',
//         border: 'solid 1px brown',
//     },
// };

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: {},
      menuItems: [],
      menuItemsModalIsOpen: false,
    };
  }
  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    const { restaurants } = qs;

    axios({
      method: "GET",
      url: `http://localhost:5000/restaurant/${restaurants}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        this.setState({ restaurants: response.data.restaurant });
      })
      .catch((err) => console.log(err));
  }

  handelOpen = () => {
    this.setState({ menuItemsModalIsOpen: true });

    axios({
      method: "GET",
      url: `http://localhost:5000/menuitems/`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        const menuItems = response.data.menuItems.map((item) => ({
          ...item, // Spread the existing item properties
          qty: 0, // Initialize qty to 0
        }));

        // Set the state with the modified menu items
        this.setState({ menuItems });
      })
      .catch((err) => console.log(err));
  };

  addItems = (index, operationType) => {
    let total = 0;
    const items = [...this.state.menuItems];
    const item = items[index];

    if (operationType === "add") {
      item.qty += 1;
    } else if (operationType === "subtract" && item.qty > 0) {
      item.qty -= 1;
    }

    items[index] = item;
    items.forEach((item) => {
      total += item.qty * item.price;
    });

    this.setState({ menuItems: items, subTotal: total });
  };

  handelfalse = () => {
    this.setState({ menuItemsModalIsOpen: false });
  };
  handlePayment = async () => {
    try {
      // Create order via backend
      const response = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: this.state.subTotal, // Amount in rupees
          currency: "INR",
        }
      );

      const { id: order_id, amount, currency, key_id } = response.data;

      // Set up RazorPay options
      const options = {
        key: key_id,
        amount: amount,
        currency: currency,
        name: "Piyush",
        description: "Test Transaction",
        order_id: order_id,
        handler: (response) => {
          alert(
            `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };
  render() {
    const { restaurants, menuItemsModalIsOpen, menuItems } = this.state;
    return (
      <div className={menuItemsModalIsOpen ? "blurred-content" : ""}>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="carousel"
          style={{ margin: "0.5em", boxShadow: "2px 2px 4px 2px black" }}
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
              id="bt1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              id="bt1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
              id="bt1"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src={`./${restaurants.image}`}
                alt="sorry for inconvenince"
                class="d-block w-100"
                width="100%"
                height="400px"
              />
            </div>
            <div class="carousel-item">
              <img
                src="Pics/Photos/pexels-apgpotr-683039.jpg"
                alt="sorry for inconvenince"
                class="d-block w-100"
                width="100%"
                height="400px"
              />
            </div>
            <div class="carousel-item">
              <img
                src="Pics/Photos/pexels-chanwalrus-941861.jpg"
                alt="sorry for inconvenince"
                class="d-block w-100"
                width="100%"
                height="400px"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <div className="info">
          <div className="detailsHeading">{restaurants.name} </div>
          <button
            className="order"
            // onClick={() => {
            //   this.handelOrder(restaurants._id);
            // }}
            onClick={this.handelOpen}
          >
            Place Online order
          </button>
        </div>

        <Tabs>
          <TabList className="my-tabs__tab-list">
            <Tab
              className="my-tabs__tab"
              selectedClassName="my-tabs__tab--selected"
            >
              Overview
            </Tab>
            <Tab
              className="my-tabs__tab"
              selectedClassName="my-tabs__tab--selected"
            >
              Contact
            </Tab>
          </TabList>
          <TabPanel className="my-tabs__tab-panel">
            <div className="tab">
              <div className="content">
                <div className="about">
                  <h4>About this Place</h4>
                </div>
                <hr></hr>
                <div className="about">
                  <h5>Cuisine</h5>
                </div>
                <div className="about">
                  <p>
                    {Array.isArray(restaurants.cuisine) &&
                    restaurants.cuisine.length > 0 ? (
                      restaurants.cuisine.map((cuisineItem) => {
                        return `${cuisineItem.name}, `;
                      })
                    ) : (
                      <p>No cuisine available</p>
                    )}
                  </p>
                </div>
                <div className="about">
                  <h5>Starting Cost : </h5>
                </div>
                <div className="about">&#8377;{restaurants.min_price}</div>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="my-tabs__tab-panel">
            <div className="tab">
              <div className="content">
                <div className="about">
                  <h5>Phone Number</h5>
                </div>
                <div className="about">
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    +91-7082852764
                  </p>
                </div>
                <div className="about">
                  <h5>{restaurants.name}</h5>
                </div>
                <div className="about">
                  {`Near ${restaurants.locality}, ${restaurants.city}`}
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>

        <Modal
          isOpen={menuItemsModalIsOpen}
          onRequestClose={this.handelfalse}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              transform: "translate(-50%, -50%)",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              width: "37%",
              height: "95vh",
              overflowY: "auto",
            },
          }}
        >
          <button className="btnClose" onClick={this.handelfalse}>
            CLOSE
          </button>
          {/* <h2 style={{}}>Select Menu Items </h2>
          <h4>{restaurants.name}</h4> */}
          <div className="menuItemBox first">
            <img className="imgMain" src="Pics/Photos/rec.jpg" alt="error" />
            <h1 className="Foodtxt">Food Menu</h1>
            <h1 className="name"> &diams; {restaurants.name} &diams;</h1>
            <p className="txttt">Select Menu Items </p>
          </div>

          <div className="menuItemBox second">
            {menuItems.length > 0 ? (
              menuItems.map((item, index) => (
                <div style={{ marginTop: "1rem", position: "relative" }}>
                  <img
                    className="imgFirst"
                    src="Pics/Photos/BurgerKing.jpg"
                    alt="error"
                  />
                  <div className="pui">
                    <h5 style={{ margin: "0" }}>{item.name}</h5>
                    <p style={{ margin: "0" }}>{item.description}</p>
                    <p style={{ margin: "0" }}>{restaurants.name}</p>
                  </div>

                  {item.qty === 0 ? (
                    <div>
                      <button
                        className="btnprice ntb"
                        onClick={() => this.addItems(index, "add")}
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <div className="btnpricecon">
                      <button
                        className="btnpriceco ntb"
                        onClick={() => this.addItems(index, "subtract")}
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        className="btnpriceco ntb"
                        onClick={() => this.addItems(index, "add")}
                      >
                        +
                      </button>
                    </div>
                  )}

                  <h4 className="price"> &#8377; {item.price}</h4>
                  <hr className="hr" />
                </div>
              ))
            ) : (
              <p>No menu items available</p>
            )}
            <div className="pay">
              <button onClick={this.handlePayment}>Pay Now</button>
              <h4>Sub-Total : &#8377; {this.state.subTotal}</h4>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Details;
