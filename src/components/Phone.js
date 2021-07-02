import React, { useEffect, useState } from "react";
import PhoneBookForm from "./PhoneBookForm";
import { toast } from "react-toastify";
import { db } from "../Firebase";
import Modal from "./Modal";

const Phone = () => {
  const [conctact, setConctact] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addOrEditContact = async (conctactOject) => {
    if (currentId === "") {
      await db.collection("conctact").doc().set(conctactOject);
      toast("New Conctact Added ", {
        type: "success",
        autoClose: 1500,
      });
    } else {
      await db.collection("conctact").doc(currentId).update(conctactOject);
      toast("Conctact  Update ", {
        type: "info",
      });
      setCurrentId("");
    }
  };

  const onDeleteContact = (id) => {
    if (window.confirm("¿ Are you sure you want to delete this contact ?")) {
      db.collection("conctact").doc(id).delete();
      toast("Conctact Deleted ", {
        type: "error",
        autoClose: 1000,
      });
    }
  };
  const getContact = async () => {
    //querySnapshot is responde server firebase
    // onSnapshot se mantiende escuchando osea que sigue cargando la data
    db.collection("conctact").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setConctact(docs);
    });
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div class="col">
          <Modal />
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <PhoneBookForm {...{ addOrEditContact, currentId, conctact }} />
        </div>
        <div className="col-8 p-2">
          {conctact.map((conctact) => (
            <div className="card mb-1" key={conctact.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="d-flex justify-content-between ">
                    <img
                      src={conctact.url}
                      alt="..."
                      width="100"
                      height="100"
                      className="img-thumbnail"
                    />
                  </div>
                  <div>
                    <h4 className="text-center mt-2">{conctact.name}</h4>
                    <p className="text-center">{conctact.phone}</p>
                  </div>

                  <div>
                    <i
                      className="material-icons text-danger"
                      onClick={() => onDeleteContact(conctact.id)}
                    >
                      close
                    </i>
                    <i
                      className="material-icons text-primary m-1 "
                      onClick={() => setCurrentId(conctact.id)}
                    >
                      create
                    </i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Phone;
