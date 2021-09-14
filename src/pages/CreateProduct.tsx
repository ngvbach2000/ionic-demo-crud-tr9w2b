import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonLabel
} from '@ionic/react';
import './CreateProduct.css';
import React, { useState } from 'react';

const CreateProduct: React.FC = () => {
  const title = 'Create Product';

  const [name, setName] = useState<string>();
  const [imageUrl, setImage] = useState<string>();
  const [quantity, setQuantity] = useState<number>();

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
      <IonItem>
            <IonLabel position="stacked" placeholder="Enter name of product">Name</IonLabel>
            <IonInput value={name} placeholder="Enter name of product" onIonChange={e => setName(e.detail.value!)}> </IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Image</IonLabel>
            <IonInput value={imageUrl} placeholder="Enter image url" onIonChange={e => setImage(e.detail.value!)}> </IonInput>
          </IonItem>

        <IonList>
          <IonItem>
          <IonLabel position="stacked">Quality</IonLabel>
            <IonInput type="number" value={quantity} placeholder="Enter the quality" onIonChange={e => setQuantity(+e.detail.value!)}></IonInput>
          </IonItem>
        </IonList>
      </IonContent>

      <IonButton color="success">Create Product</IonButton>
    </IonPage>
  );
};

export default CreateProduct;
