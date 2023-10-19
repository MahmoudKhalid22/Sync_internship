import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
function Form() {
  const [code, setCode] = useState();
  const [lan, setLan] = useState();
  const [op, setOp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const build = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      url: "https://code-compiler10.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "x-compile": "rapidapi",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "240d799d49msh81a45f0f47e2386p1e50a6jsna95bcac30710",
        "X-RapidAPI-Host": "code-compiler10.p.rapidapi.com",
      },
      data: {
        langEnum: [
          "php",
          "python",
          "c",
          "c_cpp",
          "csharp",
          "kotlin",
          "golang",
          "r",
          "java",
          "typescript",
          "nodejs",
          "ruby",
          "perl",
          "swift",
          "fortran",
          "bash",
        ],
        lang: lan,
        code: code,
        input: "",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setOp(response.data.output);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(op);
  return (
    <div>
      <form>
        <textarea onChange={(e) => setCode(e.target.value)} />
        <select id="language" onChange={(e) => setLan(e.target.value)}>
          <option value="c_cpp">c_cpp</option>
          <option value="nodejs">Java</option>
          <option value="python">python</option>
        </select>
        <button onClick={build} className="run">
          Run
        </button>
        {op && <label className="label">{op}</label>}
      </form>
    </div>
  );
}

export default Form;
