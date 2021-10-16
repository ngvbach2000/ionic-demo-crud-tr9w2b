import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonLabel,
  IonBackButton,
  IonList,
  IonText,
  IonTextarea,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  useIonLoading,
  useIonToast,
} from '@ionic/react';
import './UpdateProduct.css';
import React, { useEffect, useState } from 'react';
import { Product } from './../datas/Product';
import { useHistory, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { categories, colors } from '../datas/datas';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProduct: React.FC<Props> = ({ products, setProducts, setIsUpdate }) => {
  const title = 'Update Product';

  const { id } = useParams<any>();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    imageUrl: Yup.string()
      .required('Product image is required')
      .matches(
        /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi,
        'Please give valid image url'
      ),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('Quantity must be positive')
      .integer('Quantity must be number')
      .min(1, 'Quantity must be higher than 1'),
    price: Yup.number()
      .typeError('Please type number')
      .required('Price is required')
      .positive('Price must be positive')
      .integer('PriceQuantity must be number')
      .min(100, 'Price must be higher than 100'),
  });

  const [product, setProduct] = useState<Product | null>();

  useEffect(() => {
    const productGet = products.find((p) => p.id === id);
    if (!productGet) {
      history.replace('/view');
    }

    setProduct(productGet);
  }, [id, products]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const history = useHistory();

  const [show, dismiss] = useIonLoading();
  const [showToast, dismissToast] = useIonToast();

  const handleUpdate = () => {
    if (!product) {
      return;
    }

    show('Loading', 500, 'dots');

    setTimeout(() => {
      const index = products.findIndex((p) => p.id === product!.id);
      products[index] = product;

      setProducts([...products]);
      setProduct(null);
      setIsUpdate(true);
      history.replace('/view');

      dismiss();
      showToast(`Update product ${product.name} success`, 500);
    }, 500);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='new'>
          <IonButtons slot='start'>
            <IonBackButton text='' />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {product && (
          <>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <IonList>
                <IonItem>
                  <IonLabel position='floating' placeholder='Enter name of product'>
                    Name:<IonText color='danger'>*</IonText>
                  </IonLabel>
                  <IonInput
                    value={product.name}
                    placeholder='Enter name of product'
                    onIonChange={(e) => setProduct({ ...product, name: e.detail.value! })}
                    {...register('name')}
                  />
                </IonItem>
                <p className='error-message'>{errors.name?.message}</p>

                <IonItem>
                  <IonLabel position='floating'>
                    Image:<IonText color='danger'>*</IonText>
                  </IonLabel>
                  <IonInput
                    value={product.image}
                    placeholder='Enter image url'
                    onIonChange={(e) => setProduct({ ...product, image: e.detail.value! })}
                    {...register('imageUrl')}
                  >
                    {' '}
                  </IonInput>
                </IonItem>
                <p className='error-message'>{errors.imageUrl?.message}</p>

                <IonItem>
                  <IonLabel position='floating'>
                    Quality:<IonText color='danger'>*</IonText>
                  </IonLabel>
                  <IonInput
                    type='number'
                    value={product.quantity}
                    placeholder='Enter the quality'
                    onIonChange={(e) => setProduct({ ...product, quantity: +e.detail.value! })}
                    {...register('quantity')}
                  ></IonInput>
                </IonItem>
                <p className='error-message'>{errors.quantity?.message}</p>

                <IonItem>
                  <IonLabel position='floating'>
                    Price:<IonText color='danger'>*</IonText>
                  </IonLabel>
                  <IonInput
                    type='number'
                    placeholder='Enter the price'
                    value={product.price}
                    onIonChange={(e) => setProduct({ ...product, price: +e.detail.value! })}
                    {...register('price')}
                  />
                </IonItem>
                {errors.price?.message && <p className='error-message'>{errors.price?.message}</p>}

                <IonItem>
                  <IonLabel position='floating'>Description:</IonLabel>
                  <IonTextarea
                    value={product?.description}
                    onIonChange={(e) => setProduct({ ...product, description: e.detail.value! })}
                    autoGrow={true}
                    rows={2}
                    placeholder='Enter the description'
                    {...register('description')}
                  ></IonTextarea>
                </IonItem>
                <p></p>

                <IonItem>
                  <IonLabel>Import Date:</IonLabel>
                  <IonDatetime
                    displayFormat='DD/MM/YYYY'
                    placeholder='Select Date'
                    value={product?.importedDate}
                    onIonChange={(e) => setProduct({ ...product, importedDate: e.detail.value! })}
                    {...register('selectedImportDate')}
                  ></IonDatetime>
                </IonItem>

                <IonItem>
                  <IonLabel>Color:</IonLabel>
                  <IonSelect
                    value={product?.color}
                    placeholder='Select color'
                    onIonChange={(e) => setProduct({ ...product, color: e.detail.value })}
                    onIonCancel={() => setProduct({ ...product, color: '' })}
                  >
                    {colors.map((color) => (
                      <IonSelectOption value={color} key={color}>
                        {color}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                <IonRadioGroup
                  value={product?.category}
                  onIonChange={(e) => setProduct({ ...product, category: e.detail.value })}
                >
                  <IonListHeader>
                    <IonLabel>Category:</IonLabel>
                  </IonListHeader>

                  {categories.map((cate) => (
                    <IonItem key={cate}>
                      <IonLabel>{cate}</IonLabel>
                      <IonRadio slot='start' value={cate} />
                    </IonItem>
                  ))}
                </IonRadioGroup>

                <IonItem>
                  <IonLabel>New?</IonLabel>
                  <IonCheckbox
                    slot='end'
                    checked={product?.isNew}
                    onIonChange={(e) => setProduct({ ...product, isNew: e.detail.checked })}
                  />
                </IonItem>
              </IonList>

              <div className='contBtn ion-margin-vertical'>
                <IonButton
                  color='new'
                  expand='block'
                  className='btnCreate'
                  type='submit'
                  disabled={
                    product.name === '' || product.image === '' || product.quantity === +'' || product.price === +''
                  }
                >
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
