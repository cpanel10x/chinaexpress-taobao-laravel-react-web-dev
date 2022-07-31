import React, {useState} from 'react';
import {Layout, Menu} from "antd";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {useSettings} from "../../../api/GeneralApi";
import {useHistory} from "react-router-dom";

const {Sider} = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  {
    label: 'Dashboard',
    key: '/admin/dashboard',
    icon: <PieChartOutlined/>,
  },
  {
    label: 'Manage Orders',
    key: '2',
    icon: <PieChartOutlined/>,
    children: [
      {
        label: 'Recent Orders',
        key: '/admin/order/recent'
      },
      {
        label: 'Manage Wallet',
        key: '/admin/order/wallet'
      }
    ],
  }
];


const AdminSidebar = ({collapsed, setCollapsed}) => {

  const history = useHistory();
  const {data: settings} = useSettings();

  const clickReceive = ({key}) => {
    history.push(key);
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="logo">
        <img
          src={"/assets/img/logo/chinaexpress.png"}
          alt={settings?.site_name}
        />
      </div>
      <Menu theme="dark" onClick={clickReceive} mode="inline" items={items}/>
    </Sider>
  )
}

export default AdminSidebar;