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
import './UpdateProduct.css';
import React, { useEffect, useState } from 'react';
import { Product } from './../datas/Product';
import { useHistory, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const UpdateProduct: React.FC<Props> = ({ products, setProducts }) => {
  const title = 'Update Product';

  const { id } = useParams<any>();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    imageUrl: Yup.string()
      .required('Product image is required')
      .url('Please give valid image url')
      .test(
        'cont',
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

  const [product, setProduct] = useState<Product | null>();

  useEffect(() => {
    !product && setProduct(products.find((p) => p.id === +id));
  }, [id, product, products]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const history = useHistory();

  const handleUpdate = () => {
    if (!product) {
      return;
    }

    const index = products.findIndex((p) => p.id === product!.id);
    products[index] = product;

    setProducts([...products]);
    setProduct(null);
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
        {product && (
          <>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <IonItem>
                <IonLabel
                  position='floating'
                  placeholder='Enter name of product'
                >
                  Name
                </IonLabel>
                <IonInput
                  value={product.name}
                  placeholder='Enter name of product'
                  onIonChange={(e) =>
                    setProduct({ ...product, name: e.detail.value! })
                  }
                  {...register('name')}
                />
              </IonItem>
              <p className='error-message'>{errors.name?.message}</p>

              <IonItem>
                <IonLabel position='floating'>Image</IonLabel>
                <IonInput
                  value={product.image}
                  placeholder='Enter image url'
                  onIonChange={(e) =>
                    setProduct({ ...product, name: e.detail.value! })
                  }
                  {...register('imageUrl')}
                >
                  {' '}
                </IonInput>
              </IonItem>
              <p className='error-message'>{errors.imageUrl?.message}</p>

              <IonItem>
                <IonLabel position='floating'>Quality</IonLabel>
                <IonInput
                  type='number'
                  value={product.quantity}
                  placeholder='Enter the quality'
                  onIonChange={(e) =>
                    setProduct({ ...product, quantity: +e.detail.value! })
                  }
                  {...register('quantity')}
                ></IonInput>
              </IonItem>
              <p className='error-message'>{errors.quantity?.message}</p>

              <div className='contBtn'>
                <IonButton className='btnCreate' type='submit'>
                  Update Product
                </IonButton>
              </div>
            </form>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UpdateProduct;
