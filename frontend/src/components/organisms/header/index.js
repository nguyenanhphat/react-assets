import Icon, { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Col, Layout, Row } from 'antd';
import { IconCustom, MyPopover } from 'components/atoms';
import React, { useCallback } from 'react';
import { CONTENT_ICON_MENU } from '../../../modules/AssetManagement/constants';
import './styles.scss';

const { Header } = Layout;
const MainHeader = ({ toggleSideBar, menuVisible }) => {
  const handleToggle = useCallback(() => {
    toggleSideBar();
  }, [toggleSideBar]);

  return (
    <Header className="header-layout-custom">
      <div className="content">
        <Row>
          <Col span={12}>
            {menuVisible ? (
              <MenuUnfoldOutlined
                className="icon-toggle-menu"
                onClick={handleToggle}
              />
            ) : (
              <MenuFoldOutlined
                className="icon-toggle-menu"
                onClick={handleToggle}
              />
            )}
          </Col>
          <Col span={12} className="right-contain-header">
            <div className="icon icon-menu">
              <MyPopover
                content={CONTENT_ICON_MENU}
                trigger="click"
                type="icon"
              >
                <Icon component={IconCustom.Menu} />
              </MyPopover>
            </div>
            <div className="icon icon-user">
              <Icon component={IconCustom.InfoUser} />
            </div>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default MainHeader;
