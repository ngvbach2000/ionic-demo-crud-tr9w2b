import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ViewProduct from './pages/ViewProduct';
import CreateProduct from './pages/CreateProduct';
import { productDatas } from './datas/datas';
import { useState } from 'react';
import UpdateProduct from './pages/UpdateProduct';

const App: React.FC = () => {
  const [products, setProducts] = useState(productDatas);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId='main'>
          <Menu />
          <IonRouterOutlet id='main'>
            <Route path='/' exact={true}>
              <Redirect to='/view' />
            </Route>
            <Route path='/view' exact={true}>
              <ViewProduct products={products} setProducts={setProducts} />
            </Route>
            <Route path='/create' exact={true}>
              <CreateProduct products={products} setProducts={setProducts} />
            </Route>
            <Route path='/update/:id' exact={true}>
              <UpdateProduct products={products} setProducts={setProducts} />
            </Route>
            <Route component={ViewProduct} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
