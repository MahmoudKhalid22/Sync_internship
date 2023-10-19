import React, { useState } from "react";
import jsPDF from "jspdf";
import styles from "./Form.module.css";
import AddSkill from "./AddSkill";

function Form() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [contact, setContact] = useState({
    tel: "",
    gmail: "",
    address: "",
    linkedin: "",
  });
  const [edu, setEdu] = useState({
    uni: "",
    major: "",
    certificate: "",
    gpa: "",
  });

  const [work, setWork] = useState({
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [obj, setObj] = useState("");
  const [skills, setSkills] = useState([]);

  const onAddSkill = (sk) => {
    setSkills(sk);
  };

  const handleWorkChange = (field, value) => {
    setWork((prevWork) => ({
      ...prevWork,
      [field]: value,
    }));
  };

  const generatePDF = (e) => {
    e.preventDefault();
    // Create a new jsPDF instance
    const doc = new jsPDF();
    doc.setFont("arial");

    // Set the font size for the title
    doc.setFontSize(24);

    // Get the width of the PDF page
    const pageWidth = doc.internal.pageSize.getWidth();

    // Calculate the width of the "Name" text
    const nameText = "Name";
    const nameTextWidth = doc.getStringUnitWidth(nameText) * 24; // Adjust the font size as needed

    // Calculate the x-coordinate to center-align the text
    const nameX = (pageWidth - nameTextWidth) / 2.5;

    // Add the "Name" text
    doc.text(name, nameX, 10); // Adjust the y-coordinate as needed

    // Set the font size and style for the job title
    doc.setFontSize(16); // Set the font size for the job title

    // Calculate the width of the "Job Title" text
    const jobTitleText = "Job Title";
    const jobTitleTextWidth = doc.getStringUnitWidth(jobTitleText) * 16; // Adjust the font size as needed

    // Calculate the x-coordinate to center-align the job title
    const jobTitleX = (pageWidth - jobTitleTextWidth) / 1.85;

    // Add the "Job Title" text
    doc.setTextColor(128, 128, 128);

    doc.text(job, jobTitleX, 15); // Adjust the y-coordinate as needed
    doc.setTextColor(0, 0, 0);

    // Contact Information
    doc.setFont("arial", "bold");
    doc.text("Contact Information", 10, 28);
    const contactTextWidth = doc.getStringUnitWidth("Contact Information ") * 6;

    doc.setLineWidth(0.5); // Set the line width
    doc.line(10, 29, 10 + contactTextWidth, 29); // Draw a line under the text
    doc.setFont("arial", "normal");

    doc.text(`Mobile: ${contact.tel}`, 20, 38);
    doc.text(`email address: ${contact.gmail}`, 20, 45);
    doc.text(`location: ${contact.address}`, 20, 52);
    doc.text(`linkedin: ${contact.linkedin}`, 20, 59);

    // Education
    doc.setFont("arial", "bold");

    doc.text("Education", 10, 69);
    const educationTextWidth = doc.getStringUnitWidth("Education ") * 6;

    doc.setLineWidth(0.5); // Set the line width
    doc.line(10, 70, 10 + educationTextWidth, 70); // Draw a line under the text
    doc.setFont("arial", "normal");

    doc.text(`University: ${edu.uni}`, 20, 79);
    doc.text(`Major: ${edu.major}`, 20, 86);
    doc.text(`Certificate: ${edu.certificate}`, 20, 93);
    doc.text(`GPA: ${edu.gpa}`, 20, 100);
    // Objectives
    doc.setFont("arial", "bold");

    doc.text("Objective", 10, 110);
    const objTextWidth = doc.getStringUnitWidth("Objective ") * 6;

    doc.setLineWidth(0.5); // Set the line width
    doc.line(10, 111, 10 + objTextWidth, 111); // Draw a line under the text
    doc.setFont("arial", "normal");
    const maxCharsPerLine = 60;
    let objective = obj;
    let offsetY = 121;

    while (objective.length > 0) {
      if (objective.length > maxCharsPerLine) {
        let line = objective.substring(0, maxCharsPerLine);
        doc.text(line, 20, offsetY);
        objective = objective.substring(maxCharsPerLine);
        offsetY += 7; // Adjust the offset as needed based on the font size and layout
      } else {
        doc.text(objective, 20, offsetY);
        objective = "";
      }
    }
    // Work Experience
    let yOffset = offsetY + 10;
    doc.setFont("arial", "bold");

    doc.text("Work Experience", 10, yOffset);
    const workExpWidth = doc.getStringUnitWidth("Work Experience ") * 6;

    doc.setLineWidth(0.5); // Set the line width
    doc.line(10, yOffset + 1, 10 + workExpWidth, yOffset + 1); // Draw a line under the text
    doc.setFont("arial", "normal");
    const { company, location, startDate, endDate } = work;
    doc.text(`Company: ${company}`, 20, offsetY + 20);
    doc.text(`Location: ${location}`, 20, offsetY + 27);
    doc.text(`Start Date: ${startDate}`, 20, offsetY + 34);
    doc.text(`End Date: ${endDate}`, 20, offsetY + 41);

    // Skills with bullet points
    doc.setFont("arial", "bold");

    const skillsStartY = yOffset + 48;
    doc.text("Skills", 10, skillsStartY);
    const skillTextLength = doc.getStringUnitWidth("Skills ") * 6;
    doc.setLineWidth(0.5); // Set the line width
    doc.line(10, skillsStartY + 1, 10 + skillTextLength, skillsStartY + 1); // Draw a line under the text
    doc.setFont("arial", "normal");

    skills.forEach((skill, index) => {
      doc.text(`• ${skill}`, 20, skillsStartY + 10 + index * 5);
    });

    // Save the PDF
    doc.save("resume.pdf");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={generatePDF}>
        <div className={styles.item}>
          <label htmlFor="basic">Basic info</label>
          <div id="basic" className={styles.inputsInfo}>
            <input
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Job title"
              onChange={(e) => setJob(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label htmlFor="contact">Contact</label>
          <div id="contact" className={styles.inputsContact}>
            <input
              type="tel"
              placeholder="Phone Number"
              onChange={(e) =>
                setContact({
                  ...contact,
                  tel: e.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="gmail"
              onChange={(e) =>
                setContact({
                  ...contact,
                  gmail: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="address"
              onChange={(e) =>
                setContact({
                  ...contact,
                  address: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Linkedin"
              onChange={(e) =>
                setContact({
                  ...contact,
                  linkedin: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className={styles.item}>
          <label htmlFor="education">Education</label>
          <div id="education" className={styles.inputsContact}>
            <input
              type="text"
              placeholder="University"
              onChange={(e) =>
                setEdu({
                  ...edu,
                  uni: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="major"
              onChange={(e) =>
                setEdu({
                  ...edu,
                  major: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="certificate"
              onChange={(e) =>
                setEdu({
                  ...edu,
                  certificate: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="GPA"
              onChange={(e) =>
                setEdu({
                  ...edu,
                  gpa: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className={styles.item}>
          <label htmlFor="obj">Objectives</label>
          <div id="obj">
            <textarea onChange={(e) => setObj(e.target.value)} />
          </div>
        </div>
        <div className={styles.item}>
          <label htmlFor="work">Work Experience</label>
          <div id="work" className={styles.inputsContact}>
            <input
              type="text"
              placeholder="Company"
              onChange={(e) => handleWorkChange("company", e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              onChange={(e) => handleWorkChange("location", e.target.value)}
            />
            <div>
              <label htmlFor="start">Start date</label>
              <input
                id="start"
                type="date"
                placeholder="start date"
                onChange={(e) => handleWorkChange("startDate", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="end">End date</label>

              <input
                id="end"
                type="date"
                placeholder="end date"
                onChange={(e) => handleWorkChange("endDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={`${styles.item}  ${styles.skillItem}`}>
          <label htmlFor="skills">Skills</label>
          <div id="skills">
            <AddSkill onAddSkill={onAddSkill} />
          </div>
        </div>
        <button type="submit" className={styles.download}>
          Download
        </button>
      </form>
    </div>
  );
}

export default Form;
