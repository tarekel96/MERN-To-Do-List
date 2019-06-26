import React, { Fragment } from "react";
import ItemModal from "../components/ItemModal.jsx";
import List from "../components/List.jsx";

const ToDo = () => {
  return (
    <Fragment>
      <ItemModal />
      <br />
      <br />
      <List />
    </Fragment>
  );
};

export default ToDo;
