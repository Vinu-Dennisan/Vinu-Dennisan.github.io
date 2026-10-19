import React, { useState,useEffect, useRef } from 'react';
import './Students.css';
const container = {
  padding: '20px',
  maxWidth: '500px',
  margin: '0 auto',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
};

const inputRow = {
  display: 'flex',
  gap: '10px',
  marginBottom: '20px'
};

const input = {
  flex: 1,
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const button = {
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const list = {
  listStyle: 'none',
  padding: 0
};

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Simulate fetching initial data
    setTimeout(() => {
      setStudents(["Alice", "Bob", "Charlie"]);
    }, 500);
  }, []);

  const handleAdd = () => {
    if (newStudent.trim()) {
      setStudents([...students, newStudent]);
      setNewStudent('');
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    setNewStudent(e.target.value);
  };

  return (
    <div style={container}>
      <h2>Student List</h2>

      <div style={inputRow}>
        <input
          type="text"
          value={newStudent}
          onChange={handleInputChange}
          ref={inputRef}
          placeholder="Enter student name"
          style={input}
        />
        <button onClick={handleAdd} style={button}>Add</button>
      </div>

      {students.length > 0 ? (
        <ul style={list}>
          {students.map((student, index) => (
            <li key={index}>{student}</li>
          ))}
        </ul>
      ) : (
        <p>No students available.</p>
      )}
    </div>
  );
};


/*function Students() {
  const [student, setStudent] = useState({ name: '', course: '' });
  const [studentList, setStudentList] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (student.name.trim() === '' || student.course.trim() === '') {
      setError('Please fill out all fields.');
      return;
    }
    setStudentList([...studentList, { ...student }]);
    setStudent({ name: '', course: '' });
    setError('');
  };

  return (
    <div className="students-container">
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={student.course}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      <h3>Student List</h3>
      <ul className="student-list">
        {studentList.map((s, index) => (
          <li key={index}>
            {s.name} - {s.course}
          </li>
        ))}
      </ul>
    </div>
  );
}*/


export default Students;






