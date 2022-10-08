const generateOrderCode = (character, length) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += character.charAt(Math.floor(Math.random() * character.length));
  }
  return result;
};

export default generateOrderCode;
