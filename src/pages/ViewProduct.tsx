import {
  IonButton,
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
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from '@ionic/react';
import { columns } from '../datas/datas';
import './ViewProduct.css';
import { pencilOutline, pencilSharp, trashOutline, trashSharp } from 'ionicons/icons';
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
      <IonHeader color='white'>
        <IonToolbar>
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
          <IonButton color='primary' onClick={searchData} className='btn-search'>
            Search
          </IonButton>
        </div>

        <IonGrid className='view-list'>
          <IonRow className='view-row' style={{ backgroundColor: '#fff0cc' }}>
            {columns &&
              columns.map((column, index) => (
                <IonCol className='view-col' size={index === 1 ? '5' : index === 3 ? '2' : ''} key={index}>
                  {column}
                </IonCol>
              ))}
          </IonRow>
          {data &&
            data.map((product) => (
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
                  />
                  <Link to={`/update/${product.id}`}>
                    <IonIcon className='pencil-icon' ios={pencilSharp} md={pencilOutline} />
                  </Link>
                </IonCol>
              </IonRow>
            ))}
          {data.length === 0 && <p>No results found</p>}
        </IonGrid>
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
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
