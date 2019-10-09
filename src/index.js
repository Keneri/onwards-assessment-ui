import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { LocalizeProvider } from "react-localize-redux";
import store, { history } from "./store";



import App from "./containers/App";

import './index.css';
import "antd/lib/alert/style/css";
import "antd/lib/button/style/css";
import "antd/lib/divider/style/css";
import "antd/lib/dropdown/style/css";
import "antd/lib/form/style/css";
import "antd/lib/input/style/css";
import "antd/lib/menu/style/css";
import "antd/lib/message/style/css";
import "antd/lib/modal/style/css";
import "antd/lib/notification/style/css";
import "antd/lib/pagination/style/css";
import "antd/lib/popconfirm/style/css";
import "antd/lib/radio/style/css";
import "antd/lib/select/style/css";
import "react-intl-tel-input/dist/main.css";
import "antd/lib/button/style/css";


import registerServiceWorker from "./registerServiceWorker";

const target = document.querySelector("#root");

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocalizeProvider>
        <App />
      </LocalizeProvider>
    </ConnectedRouter>
  </Provider>,
  target
);
registerServiceWorker();
