import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
  useIonToast,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from '@ionic/react';
import './ViewProduct.css';
import { Product } from './../datas/Product';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { add, closeCircleOutline, pencilOutline } from 'ionicons/icons';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewProduct: React.FC<Props> = ({ products, setProducts, isUpdate, setIsUpdate }) => {
  const title = 'View Product';

  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState(false);

  const [searchText, setSearchText] = useState('');

  const [data, setData] = useState<Product[]>([]);
  const [offset, setOffset] = useState(1);
  const perPage = 6;

  const history = useHistory();

  const [show, dismiss] = useIonLoading();
  const [present] = useIonAlert();
  const [showToast, dismissToast] = useIonToast();

  const deleteProduct = (id: string, name: string | undefined) => {
    show('Loading', 500, 'dots');

    setTimeout(() => {
      const newList = products.filter((p) => p.id !== id);
      setProducts(newList);
      setData(newList.slice((offset - 1) * perPage, offset * perPage));
      history.replace('/view');
      dismiss();
      showToast(`Delete product ${name} successs`, 500);
    }, 500);
  };

  const getData = () => {
    const result = [...products.slice((offset - 1) * perPage, offset * perPage)];

    if (result.length > 0) {
      if (offset === 1) {
        setData(result);
      } else {
        const slice = [...data, ...result];
        setData(slice);
      }

      setDisableInfiniteScroll(result.length < perPage);
    } else {
      setDisableInfiniteScroll(true);
    }
  };

  const searchData = () => {
    if (searchText === '') {
      getData();
      return;
    }

    const searchList = products.filter(
      (product) => product.name!.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setData(searchList);
  };

  useEffect(() => {
    if (searchText === '') {
      getData();
      if (isUpdate === true) setIsUpdate(false);
    } else {
      searchData();
    }
  }, [offset, products, isUpdate, searchText]);

  const loadMore = ($event: CustomEvent<void>) => {
    setOffset(offset + 1);

    ($event.target as HTMLIonInfiniteScrollElement).complete();
  };

  useIonViewWillEnter(() => {
    getData();
    setOffset(1);
  });

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
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => {
            setSearchText(e.detail.value!);
            setOffset(1);
          }}
          showClearButton={'never'}
          animated
          placeholder='Search product'
          className='ion-margin-top'
        />

        {data &&
          data.map((product) => (
            <IonCard key={product.id} className='card-container'>
              <IonItem className='item-card'>
                <IonGrid>
                  <IonRow className='row-container'>
                    <IonCol>
                      <img src={product.image} className='image' alt='' />
                    </IonCol>
                    <IonCol className='ion-align-self-start' size='8'>
                      <IonText class='product-name'>
                        {product.name}{' '}
                        {product.isNew && (
                          <IonBadge color='success' style={{ marginLeft: '5px' }}>
                            New
                          </IonBadge>
                        )}
                      </IonText>
                      <div>
                        <IonText style={{ marginRight: '15px', fontSize: '16px' }}>
                          Quantity: {product.quantity}
                        </IonText>

                        <IonText style={{ fontSize: '16px' }}>Price: {product.price}</IonText>
                      </div>
                      <IonRow className='ion-margin-top'>
                        <IonCol>
                          <Link to={`/update/${product.id}`}>
                            <IonButton color='edt' className='btn'>
                              <IonIcon icon={pencilOutline} style={{ marginRight: '5px' }}></IonIcon> Edit
                            </IonButton>
                          </Link>
                        </IonCol>
                        <IonCol>
                          <IonButton
                            color='del'
                            className='btn'
                            onClick={() => {
                              present({
                                cssClass: 'my-css',
                                header: 'Delete',
                                message: 'Do you want to delete this product?',
                                buttons: [
                                  'Cancel',
                                  {
                                    text: 'Delete',
                                    handler: (d) => {
                                      deleteProduct(product.id, product.name);
                                      setOffset(1);
                                      setSearchText('');
                                    },
                                  },
                                ],
                                onDidDismiss: (e) => console.log('did dismiss'),
                              });
                            }}
                          >
                            <IonIcon icon={closeCircleOutline} style={{ marginRight: '5px' }}></IonIcon>
                            Delete
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            </IonCard>
          ))}
        {data.length === 0 && <p className='ion-text-center'>No results found</p>}
        <IonInfiniteScroll
          threshold='100px'
          disabled={disableInfiniteScroll}
          onIonInfinite={(e: CustomEvent<void>) => loadMore(e)}
        >
          <IonInfiniteScrollContent
            loadingSpinner={'bubbles'}
            loadingText='Loading more data...'
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton onClick={() => history.replace('/create')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
