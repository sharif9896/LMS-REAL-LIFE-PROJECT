import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../../utils/util";

export default function ImportExcel() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    console.log("Seleccted File:", file);
    formData.append("file", file); // must match upload.single("file")

    try {
      await axios.post(`${BACKEND_URL}api/exams/import`, formData);
      alert("Upload success!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

// import axios from "axios";
// import { useState } from "react";
// import { BACKEND_URL } from "../../utils/util";

// export default function ImportExcel() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file first");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file); // <-- must match multer.single("file")

//     try {
//       await axios.post(`${BACKEND_URL}api/exams/import`, formData);
//       alert("Upload success!");
//     } catch (err) {
//       console.error("Upload error:", err);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }

// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import styled from "styled-components";
// // import Sidebar from "../components/Sidebar";
// // import Header from "../components/Header";
// // import Footer from "../components/Footer";
// // import axios from "axios";
// // import { BACKEND_URL } from "../../utils/util";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";

// // const DashboardContainer = styled.div`
// //   // text-align: center;
// // `;

// // const Container = styled.div`
// //   display: flex;
// //   // min-height: 100vh;
// //   background-color: #1e1e1e;
// //   // color: white;
// // `;

// // const MainContent = styled.div`
// //   flex: 1;
// //   // padding: 20px;
// //   display: flex;
// //   flex-direction: column;
// // `;

// // const Foods = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //     price: "",
// //     ratings: "",
// //     image: null,
// //   });

// //   const [title, settitle] = useState("");
// //   const [description, setdescription] = useState("");
// //   const [price, setprice] = useState("");
// //   const [discount, setdiscount] = useState("");
// //   const [ratings, setratings] = useState("");
// //   const [tags, settags] = useState("");
// //   const [category, setcategory] = useState("");
// //   const [btext, setbtext] = useState("");
// //   const [image, setimage] = useState(null);
// //   const [imagePreview, setImagePreview] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const token = JSON.parse(localStorage.getItem("admin"));
// //     if (!token) {
// //       navigate("/");
// //       return;
// //     }
// //     // You can send formData to your API here
// //     try {
// //       const tokens = token.token;
// //       const formData = new FormData();
// //       formData.append("title", title);
// //       formData.append("description", description);
// //       formData.append("price", price);
// //       formData.append("discount", discount);
// //       formData.append("ratings", ratings);
// //       formData.append("tags", tags);
// //       formData.append("category", category);
// //       formData.append("buttonText", btext);
// //       formData.append("image", image);
// //       const foods = await axios.post(
// //         `http://localhost:3956/api/product/create`,
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${tokens}`,
// //           },
// //         }
// //       );
// //       console.log(foods);
// //       toast.success(foods.data.message);
// //       navigate("/dashboard");
// //       settitle("");
// //       setdescription("");
// //       setprice("");
// //       setratings("");
// //       setimage(null);
// //       setImagePreview("");
// //     } catch (e) {
// //       console.log(e);
// //       toast.error("Error in creating food");
// //     }
// //   };
// //   const changePhotoHandler = (e) => {
// //     const file = e.target.files[0];
// //     const reader = new FileReader();
// //     reader.readAsDataURL(file);
// //     reader.onload = () => {
// //       setImagePreview(reader.result);
// //       setimage(file);
// //     };
// //   };

// //   const API = "http://localhost:3000/api/exams";
// //   const [file, setFile] = useState(null);
// //   const [msg, setMsg] = useState("");

// //   const handleImport = async () => {
// //     if (!file) return setMsg("Choose an .xlsx file first");
// //     const fd = new FormData();
// //     fd.append("file", file);
// //     const { data } = await axios.post(`${API}/import`, fd, {
// //       headers: { "Content-Type": "multipart/form-data" },
// //     });
// //     setMsg(JSON.stringify(data));
// //   };

// //   const handleExport = async () => {
// //     const res = await axios.get(`${API}/export`, { responseType: "blob" });
// //     const url = URL.createObjectURL(new Blob([res.data]));
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = "exams.xlsx";
// //     a.click();
// //     URL.revokeObjectURL(url);
// //   };

// //   return (
// //     <Container>
// //       <Sidebar />
// //       <MainContent>
// //         <Header />
// //         <DashboardContainer className="sm:ml-[250px]">
// //           <div style={{ fontFamily: "sans-serif", padding: 24 }}>
// //             <h2>Course Exams – Excel Import/Export</h2>
// //             <div style={{ marginBottom: 12 }}>
// //               <input
// //                 type="file"
// //                 accept=".xlsx,.xls"
// //                 onChange={(e) => setFile(e.target.files[0])}
// //               />
// //               <button onClick={handleImport} style={{ marginLeft: 8 }}>
// //                 Import Excel
// //               </button>
// //               <button onClick={handleExport} style={{ marginLeft: 8 }}>
// //                 Export Excel
// //               </button>
// //             </div>
// //             <pre>{msg}</pre>
// //           </div>
// //         </DashboardContainer>
// //         <Footer />
// //       </MainContent>
// //     </Container>
// //   );
// // };

// // export default Foods;
