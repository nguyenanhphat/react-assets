import React, { useCallback, useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import renderRoutes from 'routers/render';
import { Layout } from 'antd';
import { SideBar, Header } from 'components/organisms';
import * as routePath from '../../../routers/route-path';
import './styles.scss';

const PrivateLayout = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(null);

  useEffect(() => {
    const { pathname } = location;
    if (pathname.indexOf('asset-property') > -1) {
      setSelectedKeys(routePath.ASSETS);
      return;
    }

    if (pathname.indexOf('asset-update') > -1) {
      setSelectedKeys(routePath.ASSETS);
      return;
    }

    switch (pathname) {
      case routePath.ASSET_ADD_EDIT: {
        setSelectedKeys(routePath.ASSETS);
        break;
      }
      default: {
        setSelectedKeys(pathname);
        break;
      }
    }
  }, [location]);

  const toggleSideBar = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const onChangeSelectedKeys = useCallback(key => {
    setSelectedKeys(key);
  }, []);

  return (
    <Layout className="private-layout-custom">
      <SideBar
        visible={visible}
        selectedKeys={selectedKeys}
        onChangeSelectedKeys={onChangeSelectedKeys}
      />
      <Layout>
        <Header toggleSideBar={toggleSideBar} menuVisible={visible} />

        <div className="content-layout-custom">
          <Switch>
            {renderRoutes(true)}
            <Route path="*">
              <div>Page not found</div>
            </Route>
          </Switch>
        </div>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
