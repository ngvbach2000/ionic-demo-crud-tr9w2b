import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonLabel,
} from '@ionic/react';
import './CreateProduct.css';
import React, { useEffect, useState } from 'react';
import { Product } from './../datas/Product';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CreateProduct: React.FC<Props> = ({ products, setProducts }) => {
  const title = 'Create Product';

  const [defaultValue, setDefaultValue] = useState<any>(null);

  useEffect(() => {
    if (!defaultValue) {
      setDefaultValue({
        name: '',
        imageUrl: '',
        quantity: 0,
      });
    }
  }, [defaultValue]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    imageUrl: Yup.string()
      .required('Product image is required')
      .matches(
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
        'Please give valid image url'
      ),
    quantity: Yup.number()
      .typeError('Please type number')
      .required('Quantity is required')
      .positive('Quantity must be positive')
      .integer('Quantity must be number')
      .min(1, 'Quantity must be higher than 1'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValue,
  });

  const history = useHistory();

  const handleCreate = ({
    name,
    imageUrl,
    quantity,
    price,
  }: {
    name: string;
    imageUrl: string;
    quantity: number;
    price: number;
  }) => {
    if (!name || !imageUrl || !quantity || !price) {
      return;
    }

    setProducts([
      {
        id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
        name,
        image: imageUrl,
        quantity,
        price,
      },
      ...products,
    ]);

    setDefaultValue(null);
    history.replace('/view');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={handleSubmit(handleCreate)}>
          <IonItem>
            <IonLabel position='floating'>Name</IonLabel>
            <IonInput
              type='text'
              placeholder='Enter name of product'
              value={defaultValue?.name}
              onIonChange={(e) => setDefaultValue({ ...defaultValue, name: e.detail.value })}
              {...register('name')}
            />
          </IonItem>
          <p className='error-message'>{errors.name?.message}</p>

          <IonItem>
            <IonLabel position='floating'>Image</IonLabel>
            <IonInput
              type='text'
              placeholder='Enter image url'
              value={defaultValue?.imageUrl}
              onIonChange={(e) => setDefaultValue({ ...defaultValue, imageUrl: e.detail.value })}
              {...register('imageUrl')}
            />
          </IonItem>
          <p className='error-message'>{errors.imageUrl?.message}</p>

          <IonItem>
            <IonLabel position='floating'>Quality</IonLabel>
            <IonInput
              type='number'
              placeholder='Enter the quantity'
              value={defaultValue?.quantity}
              onIonChange={(e) => setDefaultValue({ ...defaultValue, quantity: +e.detail.value! })}
              {...register('quantity')}
            />
          </IonItem>
          <p className='error-message'>{errors.quantity?.message}</p>

          <IonItem>
            <IonLabel position='floating'>Price</IonLabel>
            <IonInput
              type='number'
              placeholder='Enter the price'
              value={defaultValue?.price}
              onIonChange={(e) => setDefaultValue({ ...defaultValue, price: +e.detail.value! })}
              {...register('price')}
            />
          </IonItem>
          <p className='error-message'>{errors.price?.message}</p>

          <div className='contBtn'>
            <IonButton
              color='new'
              expand='block'
              className='btnCreate'
              type='submit'
              disabled={defaultValue?.name === '' || defaultValue?.imageUrl === '' || defaultValue?.quantity === ''}
            >
              Create Product
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateProduct;
