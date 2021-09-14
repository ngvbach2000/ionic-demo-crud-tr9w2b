import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { columns } from '../datas/datas';
import './ViewProduct.css';
import { products } from './../datas/datas';
import { trashOutline, trashSharp } from 'ionicons/icons';

const ViewProduct: React.FC = () => {
  const title = 'View Product';

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

      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid className='view-list'>
          <IonRow className='view-row' style={{ backgroundColor: '#fff0cc' }}>
            {columns &&
              columns.map((column, index) => (
                <IonCol
                  className='view-col'
                  size={index === 1 ? '5' : index === 3 ? '2' : ''}
                >
                  {column}
                </IonCol>
              ))}
          </IonRow>
          {products &&
            products.map((product) => (
              <IonRow className='view-row'>
                <IonCol>
                  <IonImg src={product.image} />
                </IonCol>
                <IonCol size='5'>
                  <IonText class='product-name'>{product.name}</IonText>
                </IonCol>
                <IonCol>{product.quantity}</IonCol>
                <IonCol size='1.5'>
                  <IonIcon
                    className='trash-icon'
                    ios={trashSharp}
                    md={trashOutline}
                  />
                </IonCol>
              </IonRow>
            ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
