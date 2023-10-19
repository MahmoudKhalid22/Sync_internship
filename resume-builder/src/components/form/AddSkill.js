import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./AddSkill.module.css";

function AddSkill({ onAddSkill }) {
  const [skill, setSkill] = useState([]);
  const [skills, setSkills] = useState([]);
  const [err, setErr] = useState(false);

  const handleSubmit = () => {
    if (skill.toString().trim() === "") setErr(true);
    if (skill.toString().trim() !== "") {
      setErr(false);
      setSkills((prev) => [...prev, skill]);

      setSkill("");
    }
  };

  console.log(err);

  const deleteSkill = (sk) => {
    const filteredSkills = skills.filter((skill) => skill !== sk);

    // If you want to update the state, use setSkills with the new filteredSkills
    setSkills(filteredSkills);
  };
  useEffect(() => {
    onAddSkill(skills);
  }, [skills, onAddSkill]);
  return (
    <div>
      {skills?.length > 0 && (
        <label className={styles["input-skill-label"]}>
          {skills?.map((skill) => (
            <div key={skill}>
              <div className={styles.skillBtn}>
                <AiOutlineClose onClick={() => deleteSkill(skill)} />
                {skill}
              </div>
            </div>
          ))}
        </label>
      )}
      <input
        type="text"
        onChange={(e) => setSkill(e.target.value)}
        value={skill}
      />
      {err && <p className={styles.error}>The input should not be empty</p>}
      <div onClick={handleSubmit} className={styles.skillBtnSubmit}>
        Add Skill
      </div>
    </div>
  );
}

export default AddSkill;
