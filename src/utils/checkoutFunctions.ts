const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
};

const formatExpiry = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (v.length >= 2) {
    return v.substring(0, 2) + '/' + v.substring(2, 4);
  }
  return v;
};

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) || 'E-mail inválido';
};

const validatePhone = (phone: string) => {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return phoneRegex.test(phone) || 'Telefone deve estar no formato (11) 99999-9999 ou (11) 9999-9999';
};

const validateZipCode = (zipCode: string) => {
  const zipRegex = /^\d{5}-?\d{3}$/;
  return zipRegex.test(zipCode) || 'CEP deve estar no formato 00000-000';
};

const validateCardNumber = (cardNumber: string) => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  return cleanNumber.length >= 13 || 'Número do cartão inválido';
};

const validateExpiry = (expiry: string) => {
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryRegex.test(expiry)) return 'Data inválida (MM/AA)';

  const [month, year] = expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const cardYear = Number.parseInt(year);
  const cardMonth = Number.parseInt(month);

  if (cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
    return 'Cartão expirado';
  }

  return true;
};

const validateCVV = (cvv: string) => {
  return cvv.length >= 3 || 'CVV deve ter pelo menos 3 dígitos';
};

export {
  formatCardNumber,
  formatExpiry,
  validateEmail,
  validatePhone,
  validateZipCode,
  validateCardNumber,
  validateExpiry,
  validateCVV,
};
