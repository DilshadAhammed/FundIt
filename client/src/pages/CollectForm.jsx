import React, { useState } from 'react';
import './CollectForm.css';
import axios from 'axios';

const CollectForm = () => {
  const [formData, setFormData] = useState({
    purpose: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    branchDetails: '',
    phoneNumber: '',
    goal: '',
    remark: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Update the image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append text fields
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Append the image file
    if (image) {
      console.log("Hi");
      
      data.append('image', image);
    }
    try {
      // console.log(formData);
      console.log(data);
      
      const responce = await axios.post('/api/donations/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData({
        purpose: '',
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        branchDetails: '',
        phoneNumber: '',
        goal: '',
        remark: '',
      });
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <div className="collect-form-container">
      <h1 className="form-title">COLLECT</h1>
      <form className="collect-form" onSubmit={handleSubmit} >
        <label htmlFor="purpose">Purpose</label>
        <input
          type="text"
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
        />
        <label htmlFor="image">Image (Optional)</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label htmlFor="accountHolderName">Account Holder Name</label>
        <input
          type="text"
          id="accountHolderName"
          name="accountHolderName"
          value={formData.accountHolderName}
          onChange={handleChange}
        />
        <label htmlFor="accountNumber">Account Number</label>
        <input
          type="text"
          id="accountNumber"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
        />
        <label htmlFor="ifscCode">IFSC Code</label>
        <input
          type="text"
          id="ifscCode"
          name="ifscCode"
          value={formData.ifscCode}
          onChange={handleChange}
        />
        <label htmlFor="branchDetails">Branch Name / Branch Code</label>
        <input
          type="text"
          id="branchDetails"
          name="branchDetails"
          value={formData.branchDetails}
          onChange={handleChange}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <label htmlFor="goal">Goal (Optional)</label>
        <input
          type="text"
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
        />
        <label htmlFor="remark">Remark</label>
        <input
          type="text"
          id="remark"
          name="remark"
          value={formData.remark}
          onChange={handleChange}
        />
        <button type="submit" className="register-button">REGISTER</button>
      </form>
    </div>
  );
};

export default CollectForm;
