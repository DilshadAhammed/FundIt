import React, { useEffect, useState } from "react";
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer,
} from "@react-aria/overlays";
import axios from 'axios';
import "./donate.css";

const Donate = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [donationsList, setDonationsList] = useState([])

  const fetchDonations = async ()=>{
    try {
      const responce = await axios.get('/api/donations/');
      setDonationsList(responce.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchDonations();
  },[])

  const handleCardClick = (donation) => {
    setSelectedDonation(donation);
  };

  const closeOverlay = () => {
    setSelectedDonation(null);
  };

  

  

  return (
    <div className="donate-page-container">
      <h1 className="donate-title">DONATE</h1>
      <input type="text" className="search-bar" placeholder="Search" />
      <div className="donate-cards-container" >
        {donationsList.map((donation) => (
          <div
            key={donation._id}
            className="donate-card"
            onClick={() => handleCardClick(donation)}
          >
            <div>
                <h3>{donation.purpose}</h3>
                <p>{donation.accountNumber}</p>
            </div>
            <div className="card-details">
              {/* <span>Code: {donation.code}</span> */}
              <span>Goal: {donation.goal}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedDonation && (
        <Popover donation={selectedDonation} closeOverlay={closeOverlay} />
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
          <button className="proceed-button" onClick={closeOverlay}>
            PROCEED TO PAY
          </button>
        </div>
      </div>
    </OverlayContainer>
  );
};

export default Donate;
