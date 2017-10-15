export const validateForm = (address, email, phone) => {
  // true means invalid, so our conditions got reversed
  return {
    address: address.length === 0,
    email: email.length === 0,
    phone: phone.length === 0
  }
};
