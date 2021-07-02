import React, { useState, useEffect } from "react";
import { db } from "../Firebase";

const PhoneBookForm = (props) => {
  const initialStateValue = {
    name: "",
    phone: "",
    url: "",
  };
  const [values, setValues] = useState(initialStateValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //copy value current  and then input update coloque valor que esta utilizando
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    props.addOrEditContact(values);
    setValues({ ...initialStateValue });
  };

  const getConctactById = async (id) => {
    const doc = await db.collection("conctact").doc(id).get();
    // establece el valor en el form
    setValues({ ...doc.data() });
  };
  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValue });
    } else {
      getConctactById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">account_circle</i>
        </div>
        <input
          className="form-control"
          placeholder="Write Name"
          type="text"
          name="name"
          onChange={handleInputChange}
          value={values.name}
        />
      </div>

      <div className="form-group input-group mt-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">contact_phone</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="phone"
          placeholder="Phone Number"
          onChange={handleInputChange}
          value={values.phone}
        />
      </div>
      <div className="form-group input-group mt-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">add_a_photo</i>
        </div>
        <input
          type="url"
          className="form-control"
          name="url"
          placeholder="Insert Url"
          onChange={handleInputChange}
          value={values.url}
        />
      </div>

      <button className="btn btn-primary btn-block mt-2">
        {props.currentId === "" ? "Save" : "Update Contact"}
      </button>
    </form>
  );
};

export default PhoneBookForm;
