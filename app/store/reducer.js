import { combineReducers } from 'redux';

import login from './login';
import global from './global';
import home from './home';
import guest from './guest';
import video from './video';
import filter from './filter';
import profile from './profile';
import myHellos from './myHellos';

export default combineReducers({
  guest,
  login,
  global,
  home,
  video,
  filter,
  profile,
  myHellos
});
