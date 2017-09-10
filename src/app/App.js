import React from "react";
import Footer from "./Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Legal from "./pages/Legal";
export default class App extends React.Component {
  render() {
    // console.log(this.props.ctx);

    let content = <div>Page Not Found</div>;

    switch (this.props.ctx.url) {
      case "/":
        content = <Home />;
        break;
      case "/about":
        content = <About />;
        break;
      case "/legal":
        content = <Legal />;
        break;
    }

    return (
      <div>
        my app! url is {this.props.ctx.url}
        {content}
        <Footer />
      </div>
    );
  }
}
