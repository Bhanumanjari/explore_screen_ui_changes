import { CommonActions, StackActions  } from '@react-navigation/native';

let navigator;

const setTopLevelNavigator = navigatorRef => {
    // alert(JSON.stringify(navigatorRef))
  navigator = navigatorRef;
};

const navigate = (routeName, params) => {
    // alert(JSON.stringify(navigator))
    console.log('navigator',navigator);
  navigator.dispatch(
    CommonActions.navigate(routeName,{
    //   routeName,
      ...params
    })
  );
};

export default {
  navigate,
  setTopLevelNavigator
};