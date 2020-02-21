import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { BrowserRouter as Router, Redirect, useHistory } from "react-router-dom"

import CardSection from './CardSection';

export default function CheckoutForm() {
  const [money, setMoney] = useState(0)
  const stripe = useStripe();
  const elements = useElements();
  let history = useHistory();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        name: 'Jenny Rosen'
      },
    });

    await handlePaymentMethodResult(result);
    history.goBack();
  };

  const handlePaymentMethodResult = async (result) => {
    if (result.error) {
      // An error happened when collecting card details,
      // show `result.error.message` in the payment form.
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 3)
      const response = await fetch('http://localhost:8001/api/pay/card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id,
          top_up: money,
          user_id: JSON.parse(localStorage.getItem('user')).id
        }),
      });

      const serverResponse = await response.json();

      handleServerResponse(serverResponse);
    }
  };

  const handleServerResponse = (serverResponse) => {
    if (serverResponse.error) {
      // An error happened when charging the card,
      // show the error in the payment form.
      alert(serverResponse.error);
    } else {
      // Show a success message
      alert(`successfully charged card`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="top-up">
        Top-up Amount
        <input
          type='number'
          name='top-up'
          value={money}
          onChange={(event) => { setMoney(event.target.value) }}
        />
      </label>

      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}