import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("/api/donations/admin", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setDonations(response.data);
      } catch (error) {
        console.error(error.response?.data?.error || "Failed to fetch donations");
      }
    };
    fetchDonations();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `/api/donations/approve/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setDonations((prev) =>
        prev.map((donation) =>
          donation._id === id ? { ...donation, approved: true } : donation
        )
      );
    } catch (error) {
      console.error(error.response?.data?.error || "Failed to approve donation");
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Account Holder</th>
            <th>Account Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id}>
              <td>{donation.purpose}</td>
              <td>{donation.accountHolderName}</td>
              <td>{donation.accountNumber}</td>
              <td data-status={donation.approved ? "Approved" : "Pending"}>
                {donation.approved ? "Approved" : "Pending"}
              </td>
              <td>
                {!donation.approved && (
                  <button onClick={() => handleApprove(donation._id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;