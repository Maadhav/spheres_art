import React from "react";
import "./EmailInput.css";
import SolidButton from "../button/SolidButton";
import axios from "axios";
import { toast } from "react-toastify";
const EmailInput = () => {
  const [email, setEmail] = React.useState("");

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleClick = () => {
    if (validateEmail(email)) {
      axios
        .get(
          "http://localhost:5001/sphere-art/us-central1/createContact?email=" +
            email
        )
        .then((res) => {
          console.log(res.data);
          toast.success("You have been added to our mailing list!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="email-container">
      <input
        className="email-input"
        placeholder="Your Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <SolidButton title="Email Me!" onClick={handleClick} />
    </div>
  );
};
export default EmailInput;
