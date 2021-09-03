import { Layout, Menu } from 'antd';
import cn from 'classnames';
import { Icon } from 'components/atoms';
import React from 'react';
import { useHistory } from 'react-router-dom';
import menu from './menu';
import './styles.scss';

const { SubMenu } = Menu;
const { Sider } = Layout;
const SideBar = ({ visible, selectedKeys, onChangeSelectedKeys }) => {
  const history = useHistory();
  const onClickMenuItem = path => {
    history.push(path);
  };

  const handleClickMenu = ({ key }) => {
    onChangeSelectedKeys(key);
  };

  const renderMenu = () => {
    return (
      <Menu
        className="sidebar-menu-custom"
        selectedKeys={[selectedKeys]}
        onClick={handleClickMenu}
        mode="inline"
      >
        {/* {menu.map(m => {
          return renderMenuItem(m);
        })} */}
        {menu.map(m => {
          if (m.children) {
            return renderSubMenu(m);
          }
          return renderMenuItem(m);
        })}
      </Menu>
    );
  };
  const renderSubMenu = data => {
    return (
      <SubMenu
        key={data.name}
        icon={data.icon || null}
        title={data.name}
        className="submenu-item-custom"
      >
        {data.children.map(d => renderMenuItem(d))}
      </SubMenu>
    );
  };
  const renderMenuItem = (item, isSubMenu) => {
    if (!item.showMenu) {
      return null;
    }
    if (item.routes) {
      return (
        <SubMenu
          className="menu-subitem-custom"
          key={item.key}
          icon={<Icon component={isSubMenu ? null : item.icon} />}
          title={item.name}
        >
          <Menu.ItemGroup>
            {item.routes &&
              item.routes.map((value, index) => {
                return (
                  <Menu.Item
                    className={'menu-item-submenu-custom'}
                    key={value.path}
                    icon={<Icon component={value.icon} />}
                    onClick={() => onClickMenuItem(value.path)}
                  >
                    {value.name}
                  </Menu.Item>
                );
              })}
          </Menu.ItemGroup>
        </SubMenu>
      );
    }

    return (
      <Menu.Item
        className={cn(visible ? 'menu-item-hide' : 'menu-item-custom')}
        key={item.path}
        icon={<Icon component={isSubMenu ? null : item.icon} />}
        onClick={() => onClickMenuItem(item.path)}
      >
        {!visible && item.name}
      </Menu.Item>
    );
  };

  return (
    <Sider
      className="sider-layout-custom"
      collapsed={visible}
      collapsible
      trigger={null}
      width={240}
    >
      <div className="logo-wrapper">
        <img
          src={
            visible
              ? require('assets/images/STS-logo-small.svg')
              : require('assets/images/STS-logo.svg')
          }
          alt="logo"
        />
      </div>
      {renderMenu()}
    </Sider>
  );
};

export default React.memo(SideBar);
