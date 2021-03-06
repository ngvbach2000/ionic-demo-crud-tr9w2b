import { Product } from './Product';

export const colors = [
  'Red',
  'Blue',
  'Pink',
  'Yellow',
  'Brown',
  'Purple',
  'Black',
  'White',
  'Green',
  'Orange',
  'Gray',
  'Azure',
  'Light Green',
  'Maroon',
  'Lime',
  'Wheat',
  'Golden',
  'Salmon',
  'Chocolate',
  'Bronze',
  'Dark Blue',
  'Spring Green',
  'Turquoise',
  'Aqua',
  'Crimson',
  'Sliver',
  'Dark Red',
  'Navy',
  'Orchid',
  'Teal',
];

export const categories = ['Domestic goods', 'Imported goods'];

export const productDatas: Product[] = [
  {
    id: 'P1',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    name: 'Clock',
    quantity: 10,
    price: 150,
    category: categories[0],
    color: colors[0],
    description: 'Beautiful',
    importedDate: new Date().toISOString(),
    isNew: true,
  },
  {
    id: 'P2',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    name: 'Red Shoes',
    quantity: 10,
    price: 200,
  },
  {
    id: 'P3',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    name: 'Headphone',
    quantity: 10,
    price: 300,
  },
  {
    id: 'P4',
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
    name: 'Sunglasses',
    quantity: 8,
    price: 170,
  },
  {
    id: 'P5',
    image:
      'https://images.unsplash.com/photo-1553456558-aff63285bdd1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
    name: 'Pepsi',
    quantity: 15,
    price: 90,
  },
  {
    id: 'P6',
    image:
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
    name: 'Lipstick',
    quantity: 17,
    price: 99,
  },
  {
    id: 'P7',
    image:
      'https://images.unsplash.com/photo-1503602642458-232111445657?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
    name: 'Chair',
    quantity: 9,
    price: 150,
  },
  {
    id: 'P8',
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
    name: 'Camera',
    quantity: 10,
    price: 170,
  },
  {
    id: 'P9',
    image:
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
    name: 'Footwear',
    quantity: 17,
    price: 99,
  },
];
