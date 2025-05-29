import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Provider";

export default function SignUp () {
  const { signup } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verifyPassword: "",
    username: "",
    about: "",
    employment: "",
    hometown: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
