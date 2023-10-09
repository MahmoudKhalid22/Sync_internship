import React, { useState } from "react";
import jsPDF from "jspdf";
import styles from "./Form.module.css";

function Form() {
  const [name, setName] = useState("");
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

  const [work, setWork] = useState({});

  const generatePDF = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();
    pdf.setFont("Arial");
    pdf.setFontSize(16);
    // Add content to the PDF
    pdf.text(10, 10, `Name: ${name}`);

    const headerText = name;
    const textWidth =
      pdf.getStringUnitWidth(headerText) * pdf.internal.getFontSize();
    const marginLeft = (pdf.internal.pageSize.width - textWidth) / 2;
    pdf.text(marginLeft, 15, headerText);
    // Add other form data to the PDF

    // Save the PDF as a downloadable file
    pdf.save("myForm.pdf");
  };

  return (
    <div id="form">
      <form onSubmit={generatePDF}>
        <div className={styles.item}>
          <label htmlFor="basic">Basic info</label>
          <div id="basic">
            <input
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input type="text" placeholder="Job title" />
          </div>
        </div>
        <div className={styles.item}>
          <label htmlFor="contact">Contact</label>
          <div id="contact">
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
          <div id="education">
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
        <button type="submit">Download</button>
      </form>
    </div>
  );
}

export default Form;
