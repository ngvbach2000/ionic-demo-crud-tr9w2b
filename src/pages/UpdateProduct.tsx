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
import React, { useEffect, useState } from 'react';
import { Product } from './../datas/Product';
import { useHistory, useParams } from 'react-router';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const UpdateProduct: React.FC<Props> = ({ products, setProducts }) => {
  const title = 'Update Product';

  const { id } = useParams<any>();

  const history = useHistory();

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    setProduct(products.find((product) => product.id === +id));
  }, [id, products]);

  const handleUpdate = () => {
    if (!product) {
      return;
    }

    const index = products.findIndex((p) => p.id === product.id);
    products[index] = product;
    console.log(products);

    setProducts([...products]);

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
            <IonCard>
              <IonItem>
                <IonLabel
                  position='floating'
                  placeholder='Enter name of product'
                >
                  Name
                </IonLabel>
                <IonInput
                  onIonFocus={() => true}
                  value={product!.name}
                  placeholder='Enter name of product'
                  onIonChange={(e) =>
                    setProduct({ ...product, name: e.detail.value! })
                  }
                >
                  {' '}
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position='floating'>Image</IonLabel>
                <IonInput
                  value={product!.image}
                  placeholder='Enter image url'
                  onIonChange={(e) =>
                    setProduct({ ...product, image: e.detail.value! })
                  }
                >
                  {' '}
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position='floating'>Quality</IonLabel>
                <IonInput
                  type='number'
                  value={product!.quantity}
                  placeholder='Enter the quality'
                  onIonChange={(e) =>
                    setProduct({ ...product, quantity: +e.detail.value! })
                  }
                ></IonInput>
              </IonItem>
            </IonCard>

            <div className='contBtn'>
              <IonButton className='btnCreate' onClick={handleUpdate}>
                Update Product
              </IonButton>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UpdateProduct;
