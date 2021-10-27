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
  IonList,
  IonTextarea,
  IonText,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  useIonToast,
  useIonLoading,
} from '@ionic/react';
import './CreateProduct.css';
import React, { useEffect, useState } from 'react';
import { Product } from './../datas/Product';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { categories, colors } from '../datas/datas';
interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CreateProduct: React.FC<Props> = ({ products, setProducts }) => {
  const title = 'Create Product';

  const [defaultValue, setDefaultValue] = useState<any>(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    imageUrl: Yup.string()
      .required('Product image is required')
      .matches(
        /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi,
        'Please give valid image url'
      ),
    quantity: Yup.number()
      .typeError('Please type number')
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

  const [show, dismiss] = useIonLoading();
  const [showToast, dismissToast] = useIonToast();

  useEffect(() => {
    if (!defaultValue) {
      setDefaultValue({
        name: '',
        imageUrl: '',
        quantity: null,
        price: null,
        description: '',
        selectedImportDate: new Date().toISOString(),
        color: '',
        category: '',
        isNew: true,
      });
    }

    return () => {
      setDefaultValue({});
    };
  }, []);

  const handleCreate = ({
    name,
    imageUrl,
    quantity,
    price,
    color,
  }: {
    name: string;
    imageUrl: string;
    quantity: number;
    price: number;
    color: string;
  }) => {
    if (!name || !imageUrl || !quantity || !price) {
      return;
    }
    show('Loading', 500, 'dots');

    setTimeout(() => {
      setProducts([
        {
          id: 'P' + Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
          name,
          image: imageUrl,
          quantity,
          price,
          description: defaultValue?.description,
          importedDate: defaultValue?.selectedImportDate,
          color,
          category: defaultValue?.category,
          isNew: defaultValue?.isNew,
        },
        ...products,
      ]);

      setDefaultValue(null);
      history.replace('/view');
      dismiss();
      showToast(`Create product ${name} success`, 500);
    }, 500);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='new'>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={handleSubmit(handleCreate)}>
          <IonList>
            <IonItem>
              <IonLabel position='floating'>
                Name:<IonText color='danger'>*</IonText>
              </IonLabel>
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
              <IonLabel position='floating'>
                Image:<IonText color='danger'>*</IonText>
              </IonLabel>
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
              <IonLabel position='floating'>
                Quantity:<IonText color='danger'>*</IonText>
              </IonLabel>
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
              <IonLabel position='floating'>
                Price:<IonText color='danger'>*</IonText>
              </IonLabel>
              <IonInput
                type='number'
                placeholder='Enter the price'
                value={defaultValue?.price}
                onIonChange={(e) => setDefaultValue({ ...defaultValue, price: +e.detail.value! })}
                {...register('price')}
              />
            </IonItem>
            {errors.price?.message && <p className='error-message'>{errors.price?.message}</p>}

            <IonItem>
              <IonLabel position='floating'>Description:</IonLabel>
              <IonTextarea
                value={defaultValue?.description}
                onIonChange={(e) => setDefaultValue({ ...defaultValue, description: e.detail.value! })}
                autoGrow={true}
                maxlength={200}
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
                value={defaultValue?.selectedImportDate}
                onIonChange={(e) => setDefaultValue({ ...defaultValue, selectedImportDate: e.detail.value! })}
                {...register('selectedImportDate')}
              ></IonDatetime>
            </IonItem>

            <IonItem>
              <IonLabel>Color:</IonLabel>
              <IonSelect
                value={defaultValue?.color}
                placeholder='Select color'
                onIonChange={(e) => setDefaultValue({ ...defaultValue, color: e.detail.value })}
                onIonCancel={() => setDefaultValue({ ...defaultValue, color: '' })}
                {...register('color')}
              >
                {colors.map((color) => (
                  <IonSelectOption value={color} key={color}>
                    {color}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonRadioGroup
              value={defaultValue?.category}
              onIonChange={(e) => setDefaultValue({ ...defaultValue, category: e.detail.value })}
              {...register('category')}
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
                checked={defaultValue?.isNew}
                onIonChange={(e) => setDefaultValue({ ...defaultValue, isNew: e.detail.checked })}
                {...register('isNew')}
              />
            </IonItem>
          </IonList>

          <div className='contBtn ion-margin-top ion-margin-bottom'>
            <IonButton
              color='new'
              expand='block'
              className='btnCreate'
              type='submit'
              disabled={
                defaultValue?.name === '' ||
                defaultValue?.imageUrl === '' ||
                defaultValue?.quantity === '' ||
                defaultValue?.price === ''
              }
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
