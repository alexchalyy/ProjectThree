import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./style.css";


const content = [
  {
    title: "GoT Swag",
    description: "Love Game of Thrones. Need more Game of Thrones in your life. Get it here. ",
    image: "images/throne.jpg"

  },
  {
    title: "Got Swag",
    description: "Figurines, Gear, Games, Art, and so much more! ",
    image: "images/dragon.jpg"
  },
  {
    title: "Got Swag",
    description: "Sign in or Sign up to buy swag",
    image: "images/thrones1.jpg"

  }
];



const Slide = () => (
  <div>
    
    <Slider className="slider-wrapper" autoplay={3500}>
      {content.map((item, index) => (
        <div
        //   key={index}
          className="slider-content"
          style={{ background: `url('${item.image}') no-repeat center center` }}
        >
          <div className="inner">
            <h1 className="slider-title">{item.title}</h1>
            <p className="slider-p">{item.description}</p>
            {/* <Link to="/login">
                <button>Sign In</button>
            </Link>
            <Link to="/register">
                <button>Sign Up</button>
            </Link> */}
          </div>
         
        </div>
      ))}
    </Slider>
  </div>
);

class DynamicSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [1, 2, 3, 4, 5], lastItem: 5 };
  }

  add() {
    const lastItem = this.state.lastItem + 1;
    this.setState({ lastItem, items: [...this.state.items, lastItem] });
  }

  pop(len) {
    const lastItem = this.state.lastItem - len;
    this.setState({ lastItem, items: this.state.items.slice(0, -len) });
  }

  render() {
    return (
      <div>
        {this.state.items.join(", ")}
        <Slider className="slider-wrapper">
          {this.state.items.map(item => (
            <div key={item} style={{ "text-align": "center" }}>
              {item}
            </div>
          ))}
        </Slider>
  
      </div>
    );
  }
}

export default Slide;
