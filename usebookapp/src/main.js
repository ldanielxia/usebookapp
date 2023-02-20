import { createApp } from 'vue'
import App from './App.vue'
import routers from './router'
import Axios from 'axios'

import { Button,Form, Field, CellGroup,Search  } from 'vant';
import { NoticeBar } from 'vant';
import { NavBar } from 'vant';
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Grid, GridItem } from 'vant';
import { Cell,Picker } from 'vant';
import { Col, Row } from 'vant';
import { Toast } from 'vant';
import { Loading } from 'vant';
import { ImagePreview } from 'vant';
import { Uploader } from 'vant';
import { Dialog } from 'vant';
import { Notify } from 'vant';
import { Icon } from 'vant';
import { Divider ,Switch  } from 'vant';
import { Image as VanImage } from 'vant';
import { ActionSheet } from 'vant';
import { Popup } from 'vant';
import { DatetimePicker } from 'vant';
import 'vant/lib/index.css';

Axios.defaults.baseURL="/api"
// Axios.defaults.headers.prototype['Content-Type']='application/json'

const app=createApp(App);
app.config.globalProperties.$http=Axios
app.config.globalProperties.HOST='/api'

app.use(routers);

app.use(Button);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(NoticeBar);
app.use(NavBar);
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Toast);
app.use(Grid);
app.use(GridItem);
app.use(Cell);
app.use(Picker);
app.use(Col);
app.use(Row);
app.use(Loading);
app.use(ImagePreview);
app.use(Uploader);
app.use(Dialog);
app.use(Notify);
app.use(Icon);
app.use(Divider);
app.use(VanImage);
app.use(Search);
app.use(Switch);
app.use(ActionSheet);
app.use(Popup);
app.use(DatetimePicker);
app.mount('#app');
