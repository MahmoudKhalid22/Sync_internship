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
    setLoading(true);

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
      setError(false);
      const response = await axios.request(options);

      console.log(response.data);
      setOp(response.data.output);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <header>
        <select id="language" onChange={(e) => setLan(e.target.value)}>
          <option>Choose</option>
          <option value="nodejs">nodejs</option>
          <option value="python">python</option>
          <option value="php">php</option>
          <option value="c">c</option>
          <option value="csharp">csharp</option>
          <option value="kotlin">kotlin</option>
          <option value="golang">golang</option>
          <option value="r">r</option>
          <option value="java">java</option>
          <option value="typescript">typescript</option>
          <option value="ruby">ruby</option>
          <option value="perl">perl</option>
          <option value="swift">swift</option>
          <option value="fortran">fortran</option>
          <option value="bash">bash</option>
        </select>
        <button onClick={() => setOp("")}>Clear</button>
        <button onClick={build} className="run">
          Run
        </button>
      </header>
      <form>
        <textarea
          className="coding"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
        {error ? (
          <div className="label">{error}</div>
        ) : loading ? (
          <p className="label">loading...</p>
        ) : (
          <label className="label">{op}</label>
        )}
      </form>
    </div>
  );
}

export default Form;
