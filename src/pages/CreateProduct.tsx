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
  IonCard,
} from '@ionic/react';
import './CreateProduct.css';
import React, { useState } from 'react';
import { Product } from './../datas/Product';
import { useHistory } from 'react-router';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CreateProduct: React.FC<Props> = ({ products, setProducts }) => {
  const title = 'Create Product';

  const history = useHistory();

  const [name, setName] = useState<string>();
  const [imageUrl, setImage] = useState<string>();
  const [quantity, setQuantity] = useState<number | null>();

  const handleCreate = () => {
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
    setName('');
    setImage('');
    setQuantity(null);

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
        <IonCard>
          <IonItem>
            <IonLabel position='floating' placeholder='Enter name of product'>
              Name
            </IonLabel>
            <IonInput
              onIonFocus={() => true}
              value={name}
              placeholder='Enter name of product'
              onIonChange={(e) => setName(e.detail.value!)}
            >
              {' '}
            </IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>Image</IonLabel>
            <IonInput
              value={imageUrl}
              placeholder='Enter image url'
              onIonChange={(e) => setImage(e.detail.value!)}
            >
              {' '}
            </IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>Quality</IonLabel>
            <IonInput
              type='number'
              value={quantity}
              placeholder='Enter the quality'
              onIonChange={(e) => setQuantity(+e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonCard>

        <div className='contBtn'>
          <IonButton className='btnCreate' onClick={handleCreate}>
            Create Product
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateProduct;
