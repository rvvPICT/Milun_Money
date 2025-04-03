import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store.js";
import Navigation from "./src/navigation/Navigation.js";

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
export default App;
