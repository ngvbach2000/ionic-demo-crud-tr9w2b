import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from '@ionic/react';
import './ViewProduct.css';
import { Product } from './../datas/Product';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewProduct: React.FC<Props> = ({ products, setProducts, isUpdate, setIsUpdate }) => {
  const title = 'View Product';

  const [searchText, setSearchText] = useState('');

  const [data, setData] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const history = useHistory();

  const [present] = useIonAlert();

  const deleteProduct = (id: number) => {
    const newList = products.filter((p) => p.id !== id);
    setProducts(newList);
    setData(newList.slice(offset, offset + perPage));
    setPageCount(Math.ceil(newList.length / perPage));
    history.replace('/view');
  };

  const getData = () => {
    const slice = products.slice(offset, offset + perPage);
    setData(slice);
    setPageCount(Math.ceil(products.length / perPage));
  };

  const searchData = () => {
    if (searchText === '') {
      getData();
      return;
    }

    const searchList = products.filter((product) => product.name!.indexOf(searchText) !== -1);
    setData(searchList);
    setPageCount(Math.ceil(searchList.length / perPage));
  };

  const handlePageChange = (e: any) => {
    const seletedPage = e.selected;
    const offset = seletedPage * perPage;
    setCurrentPage(seletedPage);
    setOffset(offset);
  };

  useEffect(() => {
    if (searchText === '') {
      getData();
      if (isUpdate === true) setIsUpdate(false);
    } else if (searchText !== '' && isUpdate === true) {
      searchData();
    }
  }, [offset, products, isUpdate]);

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
        <div className='search-container'>
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => {
              setSearchText(e.detail.value!);
              setCurrentPage(0);
              setOffset(0 * perPage);
            }}
            showClearButton={'never'}
            animated
            placeholder='Search product'
            className='search-bar'
          ></IonSearchbar>
          <IonButton color='new' onClick={searchData} className='btn-search'>
            Search
          </IonButton>
        </div>

        {data &&
          data.map((product) => (
            <IonCard key={product.id} className='card-container'>
              <IonItem className='item-card'>
                <IonGrid>
                  <IonRow className='row-container'>
                    <IonCol>
                      <IonImg src={product.image} className='image' />
                    </IonCol>
                    <IonCol className='flex flex-col ion-align-self-start' size='8'>
                      <IonText class='product-name'>{product.name}</IonText>
                      <div className='flex'>
                        <IonText style={{ marginRight: '15px', fontSize: '14px' }}>
                          Quantity: {product.quantity}
                        </IonText>
                        <IonText style={{ fontSize: '14px' }}>Price: {product.price}</IonText>
                      </div>
                      <div className='flex flex-row'>
                        <Link to={`/update/${product.id}`}>
                          <IonButton color='edt' className='btn'>
                            Edit
                          </IonButton>
                        </Link>
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
                                    deleteProduct(product.id);
                                    setCurrentPage(0);
                                    setOffset(0 * perPage);
                                    setSearchText('');
                                  },
                                },
                              ],
                              onDidDismiss: (e) => console.log('did dismiss'),
                            });
                          }}
                        >
                          Delete
                        </IonButton>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            </IonCard>
          ))}
        {data.length === 0 && <p>No results found</p>}
        {data.length !== 0 && (
          <ReactPaginate
            previousLabel={'prev'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            forcePage={currentPage}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
