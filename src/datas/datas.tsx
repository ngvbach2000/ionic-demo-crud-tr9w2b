import { Product } from './Product';

export const products: Product[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isDelete: false,
    name: 'Clock',
    quantity: 10,
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isDelete: false,
    name: 'Red Shoes',
    quantity: 10,
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isDelete: false,
    name: 'Headphonessssssssssssssssssss',
    quantity: 10,
  },
];

export const columns = ['Product', 'Name', 'Quantity', 'Action'];
