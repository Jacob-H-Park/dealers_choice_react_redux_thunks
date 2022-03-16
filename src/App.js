import React, { Component } from "react";
import PhoneNumbers from "./PhoneNumbers";
import CreateNumber from "./CreateNumber";
import CreateNumberByInput from "./CreateNumberByInput";

class App extends Component {
  render() {
    return (
      <div>
        <h1>FS-Mobile</h1>
        {/* <CreateNumberByInput /> */}
        <CreateNumber />
        <PhoneNumbers />
      </div>
    );
  }
}

export default App;
