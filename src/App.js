import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [studentFormData, setStudentFormData] = useState({
    name: "",
    age: "",
    email: "",
  });
  const [teacherFormData, setTeacherFormData] = useState({
    name: "",
    age: "",
    email: "",
    subject: "",
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    axios
      .get("https://6284a35ca48bd3c40b72cc09.mockapi.io/student")
      .then((response) => setStudents(response.data))
      .catch((error) => console.log(error));
    axios
      .get("https://642c1a85d7081590f9325028.mockapi.io/teacher")
      .then((response) => setTeachers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleStudentFormChange = (event) => {
    setStudentFormData({
      ...studentFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTeacherFormChange = (event) => {
    setTeacherFormData({
      ...teacherFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleStudentFormSubmit = (event) => {
    event.preventDefault();
    if (editingStudent) {
      axios
        .put(`https://6284a35ca48bd3c40b72cc09.mockapi.io/student/${editingStudent.id}`, studentFormData)
        .then((response) => {
          setStudents(
            students.map((student) => (student.id === editingStudent.id ? response.data : student))
          );
          setEditingStudent(null);
          setStudentFormData({ name: "", age: "", email: "" });
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post("https://6284a35ca48bd3c40b72cc09.mockapi.io/student", studentFormData)
        .then((response) => {
          setStudents([...students, response.data]);
          setStudentFormData({ name: "", age: "", email: "" });
        })
        .catch((error) => console.log(error));
    }
  };

  const handleTeacherFormSubmit = (event) => {
    event.preventDefault();
    if (editingTeacher) {
      axios
        .put(`https://642c1a85d7081590f9325028.mockapi.io/teacher/${editingTeacher.id}`, teacherFormData)
        .then((response) => {
          setTeachers(
            teachers.map((teacher) => (teacher.id === editingTeacher.id ? response.data : teacher))
          );
          setEditingTeacher(null);
          setTeacherFormData({ name: "", age: "", email: "", subject: "" });
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post("https://642c1a85d7081590f9325028.mockapi.io/teacher", teacherFormData)
        .then((response) => {
          setTeachers([...teachers, response.data]);
          setTeacherFormData({ name: "", age: "", email: "", subject: "" });
        })
        .catch((error) => console.log(error));
    }
  };

  const handleStudentDelete = (id) => {
    axios
      .delete(`https://6284a35ca48bd3c40b72cc09.mockapi.io/student/${id}`)
      .then(() => setStudents(students.filter((student) => student.id !== id)))
      .catch((error) => console.log(error));
  };

  const handleTeacherDelete = (id) => {
    axios
      .delete(`https://642c1a85d7081590f9325028.mockapi.io/teacher/${id}`)
      .then(() => setTeachers(teachers.filter((teacher) => teacher.id !== id)))
      .catch((error) => console.log(error));
    };

    const handleStudentEdit = (student) => {
    setEditingStudent(student);
    setStudentFormData({ name: student.name, age: student.age, email: student.email });
    };
    
    const handleTeacherEdit = (teacher) => {
    setEditingTeacher(teacher);
    setTeacherFormData({
    name: teacher.name,
    age: teacher.age,
    email: teacher.email,
    subject: teacher.subject,
    });
    };
    
    return (
      <div className="container">
      <h1 className="my-5">Admin Dashboard</h1>
      <h2 className="my-4">Students</h2>
      <table className="table table-striped">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th></th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              {students.map((student) => (
                  <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.email}</td>
                      <td>
                          <button className="btn btn-sm btn-primary" onClick={() => handleStudentEdit(student)}>
                              Edit
                          </button>
                      </td>
                      <td>
                          <button className="btn btn-sm btn-danger" onClick={() => handleStudentDelete(student.id)}>
                              Delete
                          </button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
      <h3 className="my-4">Add/Edit Student</h3>
      <form onSubmit={handleStudentFormSubmit}>
          <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={studentFormData.name}
                  onChange={handleStudentFormChange}
              />
          </div>
          <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                  type="text"
                  className="form-control"
                  id="age"
                  name="age"
                  value={studentFormData.age}
                  onChange={handleStudentFormChange}
              />
          </div>
          <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={studentFormData.email}
                  onChange={handleStudentFormChange}
              />
          </div>
          <button type="submit" className="btn btn-primary">
              {editingStudent ? "Update" : "Add"}
          </button>
      </form>
      <hr className="my-5" />
      <h2 className="my-4">Teachers</h2>
      <table className="table table-striped">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th></th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              {teachers.map((teacher) => (
                  <tr key={teacher.id}>
                      <td>{teacher.name}</td>
                      <td>{teacher.age}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.subject}</td>
                      <td>
                          <button className="btn btn-sm btn-primary" onClick={() => handleTeacherEdit(teacher)}>
                              Edit
                          </button>
                      </td>
                      <td>
                          <button className="btn btn-sm btn-danger" onClick={() => handleTeacherDelete(teacher.id)}>
                              Delete
                          </button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
  <h3>Add/Edit Teacher</h3>
  <form onSubmit={handleTeacherFormSubmit}>
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
        value={teacherFormData.name}
        onChange={handleTeacherFormChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="age">Age</label>
      <input
        type="text"
        className="form-control"
        id="age"
        name="age"
        value={teacherFormData.age}
        onChange={handleTeacherFormChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        className="form-control"
        id="email"
        name="email"
        value={teacherFormData.email}
        onChange={handleTeacherFormChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="subject">Subject</label>
      <input
        type="text"
        className="form-control"
        id="subject"
        name="subject"
        value={teacherFormData.subject}
        onChange={handleTeacherFormChange}
      />
    </div>
    <button type="submit" className="btn btn-primary">
      {editingTeacher ? "Update" : "Add"}
    </button>
  </form>
</div>
);
}

export default AdminDashboard;    