const localStorageUserObj = function() {
  return JSON.parse(localStorage.getItem('user'));
}
const setWallet = function (money) {
  const user = localStorageUserObj();
  user.wallet_amount = Number(user.wallet_amount) + money*100;
  localStorage.setItem('user', JSON.stringify(user));
}

module.exports = ({localStorageUserObj, setWallet});