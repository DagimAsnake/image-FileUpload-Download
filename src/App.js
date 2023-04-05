import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [path, setPath] = useState(null);

  const download = (e) => {
    e.preventDefault();
    // console.log(e.target.href);
    console.log(e.target.name);
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${e.target.name}`); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [Img, setImg] = useState();
  useEffect(() => {
    try {
      axios({
        url: `http://localhost:5000/img`,
      }).then((res) => {
        setImg(res.data.msg);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(path);
    const formData = new FormData();
    formData.append("file", path);
    const addreport = async () => {
      const response = await fetch("http://localhost:5000/img", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.log("something is wrong");
      }

      const data = await response.json();
      console.log(data);
    };

    addreport();
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input type="file" onChange={(e) => setPath(e.target.files[0])} />
        <button>submit</button>
      </form>
      {Img?.map((img) => (
        // console.log(img)
        <a
          href={`http://localhost:5000/${img.path}`}
          name={`${img.name}`}
          download
          onClick={(e) => download(e)}
        >
          download
        </a>
      ))}
    </div>
  );
}

export default App;
