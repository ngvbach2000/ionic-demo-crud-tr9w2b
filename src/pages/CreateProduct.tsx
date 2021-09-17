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
import React from 'react';
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    imageUrl: Yup.string()
      .required('Product image is required')
      .url('Please give valid image url')
      .test(
        'cont1',
        'Please give valid image url',
        (val) =>
          /\.(gif|jpg|jpeg|tiff|png)$/i.test(val!) || val!.indexOf('images') > 0
      ),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('Quantity must be positive')
      .integer('Quantity must be number')
      .min(1, 'Quantity must be higher than 1'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
      quantity: '',
    },
  });

  const history = useHistory();

  const handleCreate = ({
    name,
    imageUrl,
    quantity,
  }: {
    name: string;
    imageUrl: string;
    quantity: number;
  }) => {
    if (!name || !imageUrl || !quantity) {
      return;
    }

    setProducts([
      {
        id: Math.floor(Math.random() * 10),
        name,
        image: imageUrl,
        quantity,
      },
      ...products,
    ]);
    reset();
    history.push('/view');
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
            <IonLabel position='floating' placeholder='Enter name of product'>
              Name
            </IonLabel>
            <IonInput
              type='text'
              placeholder='Enter name of product'
              {...register('name')}
            />
          </IonItem>
          <p className='error-message'>{errors.name?.message}</p>

          <IonItem>
            <IonLabel position='floating'>Image</IonLabel>
            <IonInput
              type='text'
              placeholder='Enter image url'
              {...register('imageUrl')}
            />
          </IonItem>
          <p className='error-message'>{errors.imageUrl?.message}</p>

          <IonItem>
            <IonLabel position='floating'>Quality</IonLabel>
            <IonInput
              type='number'
              placeholder='Enter the quality'
              {...register('quantity')}
            />
          </IonItem>
          <p className='error-message'>{errors.quantity?.message}</p>

          <div className='contBtn'>
            <IonButton expand='block' className='btnCreate' type='submit'>
              Create Product
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateProduct;
