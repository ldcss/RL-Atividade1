export interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  zipCode: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: 'credit' | 'debit' | 'pix' | 'boleto';
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
}
