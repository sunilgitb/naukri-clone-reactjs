import React from 'react';
import { useContext, useState } from 'react';
import styles from './Registers.module.css';
import { AuthContext } from './AuthContextProvider';
import SigninNavbar from '../../Signin/SigninNavbar';
import { Redirect, useHistory } from 'react-router-dom';

const Personal = ({ isAuthenticated, handleLogin }) => {
  const { form, setForm, data, setData } = useContext(AuthContext);
  const [flag, setFlag] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let payload = {
      ...form,
      [name]: value,
    };
    setForm(payload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name !== '' && form.email !== '' && form.mobile !== '') {
      let payload = [
        ...data,
        {
          name: form.name,
          email: form.email,
          mobile: form.mobile,
        },
      ];
      setData(payload);
      setFlag((prev) => !prev);
    } else {
      alert('Enter all data');
    }
  };

  const handleCancel = () => {
    if (isAuthenticated) {
      handleLogin(form.email, form.password);
    } else {
      history.push('/');
    }
  };

  return !flag ? (
    <>
      <SigninNavbar />
      <div className={styles.outer1}>
        <h1 className={styles.regi}>Registration Form</h1>
        <div className={styles.outer}>
          <div className={styles.flex}>
            <div className={styles.margin1}>Name :-</div>
            <input
              className={styles.margin}
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className={styles.flex}>
            <div className={styles.margin1}>Email ID :-</div>
            <input
              className={styles.margin}
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className={styles.flex}>
            <div className={styles.margin1}>Mobile Number :-</div>
            <input
              className={styles.margin}
              placeholder="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              type="number"
            />
          </div>
          <div style={{ display: 'flex', width: '550px', marginLeft: '37.5%' }}>
            <button className={styles.btn} onClick={handleSubmit}>
              Next
            </button>
            <button onClick={handleCancel} className={styles.btn}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/education" />
  );
};

export default Personal;
