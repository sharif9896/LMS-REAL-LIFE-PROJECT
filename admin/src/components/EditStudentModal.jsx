import React, { useState, useEffect } from "react";
import axios from "axios";
// import toast from "react-hot-toast";

export default function EditStudentModal({
  visible,
  student,
  onHide,
  onUpdated,
}) {
  const [formData, setFormData] = useState({
    Reg_no: "",
    Name: "",
    Class: "",
    Department: "",
    DOB: "",
    BloodGroup: "",
    Phone: "",
    ParentPhone: "",
    Adhar: "",
    BankName: "",
    BankAccount: "",
    Email: "",
    ParentName: "",
    Address: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/students/${student._id}`,
        formData
      );
      toast.success("Student updated successfully!");
      onUpdated();
      onHide();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 w-full max-w-2xl rounded shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {[
            ["Reg_no", "Register No"],
            ["Name", "Name"],
            ["Class", "Class"],
            ["Department", "Department"],
            ["DOB", "DOB"],
            ["BloodGroup", "Blood Group"],
            ["Phone", "Mobile No"],
            ["ParentPhone", "Parent No"],
            ["Adhar", "Aadhar No"],
            ["BankName", "Bank Name"],
            ["BankAccount", "Account No"],
            ["Email", "Email"],
            ["ParentName", "Parent Name"],
            ["Address", "Address"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="text-sm">{label}</label>
              <input
                type="text"
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          ))}
          <div className="col-span-2 flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onHide}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
