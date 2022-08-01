import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import { useSettings } from "../../../api/GeneralApi";
import { Link, useHistory, useLocation } from "react-router-dom";

const { Sider } = Layout;

const items = [
  {
    label: "Dashboard",
    key: "/admin/dashboard",
    icon: <PieChartOutlined />,
  },
  {
    label: "Manage Orders",
    key: "/admin/order",
    icon: <PieChartOutlined />,
    children: [
      {
        label: "Recent Orders",
        key: "/admin/order/recent",
      },
      {
        label: "Manage Wallet",
        key: "/admin/order/wallet",
      },
      {
        label: "Manage Invoice",
        key: "/admin/order/invoice",
      },
      {
        label: "Tracking Info",
        key: "/admin/order/tracking",
      },
    ],
  },
  {
    label: "Manage Products",
    key: "/admin/product/list",
    icon: <PieChartOutlined />,
  },
  {
    label: "Manage Coupons",
    key: "/admin/coupon",
    icon: <PieChartOutlined />,
    children: [
      {
        label: "Coupon Logs",
        key: "/admin/coupon/logs",
      },
      {
        label: "Manage Coupon",
        key: "/admin/coupon/list",
      },
    ],
  },
  {
    label: "Customer",
    key: "/admin/customer",
    icon: <PieChartOutlined />,
  },
  {
    label: "Manage Menus",
    key: "/admin/menu",
    icon: <PieChartOutlined />,
  },
  {
    label: "Manage Categories",
    key: "/admin/taxonomy",
    icon: <PieChartOutlined />,
  },
  {
    label: "Contact Message",
    key: "/admin/contact",
    icon: <PieChartOutlined />,
  },
  {
    label: "Manage Pages",
    key: "/admin/pages",
    icon: <PieChartOutlined />,
  },
  {
    label: "Manage FAQ",
    key: "/admin/faqs",
    icon: <PieChartOutlined />,
  },
  {
    label: "Frontend Settings",
    key: "5",
    icon: <PieChartOutlined />,
    children: [
      {
        label: "Top Notice",
        key: "/admin/front-setting/top-notice",
      },
      {
        label: "Announcements",
        key: "/admin/front-setting/announcement",
      },
      {
        label: "Manage Banners",
        key: "/admin/front-setting/banner",
      },
      {
        label: "Promotional Banner",
        key: "/admin/front-setting/promo-banner",
      },
      {
        label: "Manage Sections",
        key: "/admin/front-setting/sections",
      },
      {
        label: "Image Loaders",
        key: "/admin/front-setting/image-loading",
      },
    ],
  },
  {
    label: "System Settings",
    key: "6",
    icon: <PieChartOutlined />,
    children: [
      {
        label: "General Settings",
        key: "/admin/setting/general",
      },
      {
        label: "Price Settings",
        key: "/admin/setting/price",
      },
      {
        label: "Order Limitation",
        key: "/admin/setting/order-limit",
      },
      {
        label: "Popup Messages",
        key: "/admin/setting/popup",
      },
      {
        label: "Block Words",
        key: "/admin/setting/block-words",
      },
      {
        label: "Messages Settings",
        key: "/admin/setting/messages",
      },
      {
        label: "Cache Control",
        key: "/admin/setting/cache-control",
      },
      {
        label: "Bkash API Response",
        key: "/admin/setting/bkash-api-response",
      },
    ],
  },
  {
    label: "System Admin",
    key: "7",
    icon: <PieChartOutlined />,
    children: [
      {
        label: "Access",
        key: "/admin/setting/access",
        children: [
          {
            label: "User Management",
            key: "/admin/user",
          },
          {
            label: "Role Management",
            key: "/admin/role",
          },
          {
            label: "Bkash Refund Payment",
            key: "/admin/bkash/refund",
          },
        ],
      },
      {
        label: "Log Viewer",
        key: "/admin/log/viewer",
        children: [
          {
            label: "Log Dashboard",
            key: "/admin/log/dashboard",
          },
          {
            label: "Error Logs",
            key: "/admin/log/error-list",
          },
        ],
      },
    ],
  },
];

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const history = useHistory();
  const { data: settings } = useSettings();

  const clickReceive = ({ key }) => {
    history.push(key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo">
        <img
          src={"/assets/img/logo/chinaexpress.png"}
          alt={settings?.site_name}
        />
      </div>
      <Menu
        theme="dark"
        onClick={clickReceive}
        defaultSelectedKeys={location.pathname}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default AdminSidebar;
