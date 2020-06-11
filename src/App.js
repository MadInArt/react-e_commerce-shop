import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import SignInRegisterPage from "./pages/signinRegisterPage/signInRegisterPage";
import { auth } from "./firebase/firebase.utils";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
    });
   
  }

  componentWillUnmount() {
    this.unubcribeFromAuth();
  }

  render() {
    return (
      <div>
        <Navbar currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInRegisterPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
