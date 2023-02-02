import emailValidator from 'deep-email-validator';

const isEmailValid = async (email) => {
    return emailValidator.validate(email);
};

// console.log(isEmailValid('dukelester4@gmail.com'))
const { valid, reason, validators } = await isEmailValid('dukelester@gmail.com');
console.log(valid, reason, validators);