import React, { useEffect, useState } from "react";
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer,
} from "@react-aria/overlays";
import axios from "axios";
import "./donate.css";

import DonationButton from "../components/DonationButton";

const Donate = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [donationsList, setDonationsList] = useState([]);

  const fetchDonations = async () => {
    try {
      const responce = await axios.get("/api/donations/approved/");
      setDonationsList(responce.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleCardClick = (donation) => {
    setSelectedDonation(donation);
  };

  const isGoalReached = (donation) => {
    const totalDonations = donation.donors.reduce((sum, donor) => sum + donor.amount, 0);
    return totalDonations >= donation.goal;
  };

  const closeOverlay = () => {
    setSelectedDonation(null);
  };

  return (
    <div className="donate-page-container">
      <h1 className="donate-title">DONATE</h1>
      <input type="text" className="search-bar" placeholder="Search" />
      <div className="donate-cards-container">
        {donationsList.map((donation) => (
          <div
            key={donation._id}
            className={`donate-card ${isGoalReached(donation) ? "disabled" : ""}`}
            onClick={() => handleCardClick(donation)}
          >
            <div>
              <h3>{donation.purpose}</h3>
              <p>{donation.accountNumber}</p>
            </div>
            <div className="card-details">
              <span>Goal: ₹{donation.goal}</span>
              <span>Raised: ₹{donation.donors.reduce((sum, donor) => sum + donor.amount, 0)}</span>
            </div>
            {isGoalReached(donation) && <div className="goal-reached">Goal Reached!</div>}
          </div>
        ))}
      </div>

      {selectedDonation && (
        <Popover donation={selectedDonation} closeOverlay={() => setSelectedDonation(null)} />
      )}
    </div>
  );
};

const Popover = ({ donation, closeOverlay }) => {
  const ref = React.useRef();
  const { overlayProps } = useOverlay(
    { isOpen: true, onClose: closeOverlay, isDismissable: true },
    ref
  );
  usePreventScroll();
  useModal();

  return (
    <OverlayContainer>
      <div className="popover-overlay" {...overlayProps}>
        <div className="popover" ref={ref}>
          <h2>{donation.purpose}</h2>
          <p>{donation.description}</p>
          <div className="account-info">
            <p>Account Holder Name: {donation.accountHolderName}</p>
            <p>Account Number: {donation.accountNumber}</p>
            <p>IFSC Code: {donation.ifscCode}</p>
            <p>Branch: {donation.branchDetails}</p>
            <p>Phone No: {donation.phoneNumber}</p>
          </div>

          <div className="donors-list">
            <h3>Donors</h3>
            {donation.donors.length > 0 ? (
              <ul>
                {donation.donors.map((donor, index) => (
                  <li key={index}>
                    <span>{donor.name}</span>
                    <span>₹{donor.amount}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No donors yet.</p>
            )}
          </div>

          <DonationButton />
        </div>
      </div>
    </OverlayContainer>
  );
};

export default Donate;
