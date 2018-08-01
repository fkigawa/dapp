import { Navigation } from 'react-native-navigation';

const getCurrentInstanceId = () => {
  return new Promise(function(resolve, reject) {

    const tryGetScreenId = () => {
      Navigation.getCurrentlyVisibleScreenId().then((screenInfo) => {
        if (screenInfo === undefined) {
          setTimeout(tryGetScreenId, 25);
        } else {
          resolve(screenInfo.screenId);
        }
      }).catch((err) => reject(err));
    };

    tryGetScreenId();
  });
}

const startNavigator = () => {
  getCurrentInstanceId().then((id) => {
    const startId = id;

    const startTabs = () => {
      Navigation.startTabBasedApp({
        tabs: [
          {
            label: 'Categories',
            screen: 'CategoryScreen', // this is a registered name for a screen
            title: 'Categories'
          },
          {
            label: 'Cart',
            screen: 'CartScreen',
            title: 'Cart'
          },
          {
            label: 'My Account',
            screen: 'AccountScreen',
            title: 'My Account'
          }
        ],
        tabsStyle: {
          tabBarTextFontSize: 20,
          navBarComponentAlignment: 'center'
        },
      }).then(() => {
        getCurrentInstanceId().then((id) => {
          if (id === startId) {
            console.log('Navigation. retrying tab start', id, startId);
            setTimeout(startTabs, 25);
          }
        })
      });
    };

    startTabs();
  })

}

export default startNavigator
