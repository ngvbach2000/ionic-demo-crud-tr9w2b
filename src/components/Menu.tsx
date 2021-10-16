import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { addCircleOutline, addCircleSharp, bagHandleOutline, bagHandleSharp, logoIonic } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'View Product',
    url: '/view',
    iosIcon: bagHandleOutline,
    mdIcon: bagHandleSharp,
  },
  {
    title: 'Create Product',
    url: '/create',
    iosIcon: addCircleOutline,
    mdIcon: addCircleSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu side='start' contentId='main' type='overlay'>
      <IonHeader>
        <IonToolbar color='new'>
          <IonTitle slot='start'>
            <span className='flex'>
              <IonIcon icon={logoIonic} style={{ marginRight: '5px' }} /> Ionic Framework Demo
            </span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList id='inbox-list'>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection='root'
                  lines='none'
                  detail={false}
                >
                  <IonIcon slot='start' ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
