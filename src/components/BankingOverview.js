// src/components/BankingOverview.js
import React from 'react';

const BankingOverview = ({ bankBalance, cardBalance, cashInHand, paymentClearing }) => {
  return (
    <div>
      <h2>Banking Overview</h2>
      <div>
        <h3>Bank Balance</h3>
        <p>₹{bankBalance}</p>
      </div>
      <div>
        <h3>Card Balance</h3>
        <p>₹{cardBalance}</p>
      </div>
      <div>
        <h3>Cash in Hand</h3>
        <p>₹{cashInHand}</p>
      </div>
      <div>
        <h3>Payment Clearing</h3>
        <p>₹{paymentClearing}</p>
      </div>
    </div>
  );
};

export default BankingOverview;