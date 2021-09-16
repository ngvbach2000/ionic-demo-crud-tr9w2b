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
  useIonAlert,
} from '@ionic/react';
import { columns } from '../datas/datas';
import './ViewProduct.css';
import {
  pencilOutline,
  pencilSharp,
  trashOutline,
  trashSharp,
} from 'ionicons/icons';
import { Product } from './../datas/Product';
import { Link } from 'react-router-dom';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ViewProduct: React.FC<Props> = ({ products, setProducts }) => {
  const title = 'View Product';

  const [present] = useIonAlert();

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <IonPage>
      <IonHeader color='white'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid className='view-list'>
          <IonRow className='view-row' style={{ backgroundColor: '#fff0cc' }}>
            {columns &&
              columns.map((column, index) => (
                <IonCol
                  className='view-col'
                  size={index === 1 ? '5' : index === 3 ? '2' : ''}
                  key={index}
                >
                  {column}
                </IonCol>
              ))}
          </IonRow>
          {products &&
            products.map((product) => (
              <IonRow className='view-row' key={product.id}>
                <IonCol>
                  <IonImg src={product.image} className='image' />
                </IonCol>
                <IonCol size='5'>
                  <IonText class='product-name'>{product.name}</IonText>
                </IonCol>
                <IonCol>{product.quantity}</IonCol>
                <IonCol size='2' className='actionCol'>
                  <IonIcon
                    className='trash-icon'
                    ios={trashSharp}
                    md={trashOutline}
                    onClick={() => {
                      present({
                        cssClass: 'my-css',
                        header: 'Delete',
                        message: 'Do you want to delete this product?',
                        buttons: [
                          'Cancel',
                          {
                            text: 'Delete',
                            handler: (d) => deleteProduct(product.id),
                          },
                        ],
                        onDidDismiss: (e) => console.log('did dismiss'),
                      });
                    }}
                  />
                  <Link to={`/update/${product.id}`}>
                    <IonIcon
                      className='pencil-icon'
                      ios={pencilSharp}
                      md={pencilOutline}
                    />
                  </Link>
                </IonCol>
              </IonRow>
            ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
