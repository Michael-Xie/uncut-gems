const localStorageUserObj = function() {
  return JSON.parse(localStorage.getItem('user'));
}
const setWallet = function (money) {
  const user = localStorageUserObj();
  user.wallet_amount += money;
  localStorage.setItem('user', JSON.stringify(user));
}

module.exports = ({localStorageUserObj, setWallet});