import React, { useEffect } from "react";

const DonateButton = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.setAttribute("data-payment_button_id", "pl_Q2ddUsIZtuT0ou"); // Replace "someID" with your actual Razorpay button ID
    document.getElementById("razorpay-button-container").appendChild(script);
  }, []);

  return (
    <form id="razorpay-button-container">
      
    </form>
  );
};

export default DonateButton;