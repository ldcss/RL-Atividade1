import type { ProductInterface } from '../types/Product';

export const products: ProductInterface[] = [
  {
    id: 1,
    name: 'Carregador USB Lightning 40W',
    description: 'Carregador USB Lightning 40W para iPhone e iPad',
    image: '/images/products/produto1.jpg',
    badges: ['Novo', 'Popular'],
    type: 'acessorio',
    price: 44.99,
  },
  {
    id: 2,
    name: 'Carregador USB-C 40W',
    description: 'Carregador USB-C para celulares e tablets',
    image: '/images/products/produto2.jpg',
    badges: ['Oferta'],
    type: 'acessorio',
    price: 49.99,
  },
  {
    id: 3,
    name: 'Carregador por Indução 15w',
    description: 'Carregador por indução 15w para celulares',
    image: '/images/products/produto2.jpg',
    badges: ['Destaque', 'Edição Limitada'],
    type: 'acessorio',
    price: 59.99,
  },
];
