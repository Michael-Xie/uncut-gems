import axios from "axios"

const handleRegister = (event, reducer) => {
  axios.post("http://localhost:8001/api/users", {
    user_name: "telephone",
    password: "woohoo",
    wallet_amount: null,
    stripe_charge_id: null
  })
  .then(res => console.log("added to DB"))
  .catch(err => console.log(err))
}

export default handleRegister
