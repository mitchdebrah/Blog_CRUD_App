import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../medium/Context";
import "../index.css";

const Author = ()=> {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description,
    };

    