import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { BrowserRouter as Router, Redirect, useHistory } from "react-router-dom"
import functions from "../../helpers/functions";
import styled from 'styled-components'
import CardSection from './CardSection';
import axios from 'axios';

const Title = styled.div`
display: flex;

align-items: center;
justify-content: center;
max-width: 600px;
width: 100%;
height: 50px;
margin: 0 auto 20px;
font-size: 16px;
font-weight: bold;
border-bottom: 1px solid #dbdbdb;
background-color: #fff;
`

const Form = styled.form` 
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width:100%;
  margin: 50px auto;
`

const Button = styled.button`
  background-color: #000; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  margin-top: 20px;
  cursor:pointer;
`
const Label = styled.label` 
  
`



const Input = styled.input`
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 20px;
`

export default function CheckoutForm() {
  const [money, setMoney] = useState(0)
  const [error, setError] = useState([]);
  const stripe = useStripe();
  const elements = useElements();
  let history = useHistory();
  const errorMessages = [];

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

    handlePaymentMethodResult(result);
  };

  const handlePaymentMethodResult = async (result) => {
    setError([]);

    if (result.error) {
      // An error happened when collecting card details,
      // show `result.error.message` in the payment form.
      
      errorMessages.push(result.error.message);
      setError(errorMessages);

    } else {
      // Otherwise send paymentMethod.id to your server (see Step 3)

      // NOTE: hardcoded to api-server
      const response = await fetch('https://uncut-gems-api-server.herokuapp.com/api/pay/card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id,
          top_up: money,
          user_id: JSON.parse(localStorage.getItem('user')).id
        }),
      });
      functions.setWallet(money);
      const serverResponse = await response.json();

      handleServerResponse(serverResponse);
    }
  };

  const handleServerResponse = (serverResponse) => {
    if (serverResponse.error) {
      // An error happened when charging the card,
      // show the error in the payment form.
      errorMessages.push(serverResponse.error);
      setError(errorMessages);
    } else {
      // Show a success message
      axios.get(`https://uncut-gems-api-server.herokuapp.com/api/global/1`)
           .catch(err => console.log(err))
      history.goBack();

    }
  };

  return (
    <div>
    <Title>Add More Gems</Title>
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="top-up">
        <div><strong>Top-up Amount</strong></div>
        <Input
          type='number'
          min={0}
          name='top-up'
          value={money}
          onChange={(event) => { setMoney(event.target.value) }}
        />
      </Label>
      {error.map((err, i) => {
        return <div className='error-msg' key={i}>{err}</div>
      })}
      <CardSection />
      <Button disabled={!stripe}>Confirm order</Button>
    </Form>
    </div>
  );
}
