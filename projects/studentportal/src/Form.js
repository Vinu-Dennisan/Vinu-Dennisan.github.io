import React, { useState } from 'react';
import styles from './Form.module.css'; // CSS Module
import styled from 'styled-components';

const Button = styled.button`
  background-color: #6a0dad;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
`;

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form Submitted:\n' + JSON.stringify(formData, null, 2));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Register</h2>

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Gender:
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">--Select--</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          required
        />
        I agree to the terms
      </label>

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Form;
