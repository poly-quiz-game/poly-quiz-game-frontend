import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Detail from "../../component/detail";

class Index extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Detail />} />
      </Routes>
    );
  }
}

export default Index;
