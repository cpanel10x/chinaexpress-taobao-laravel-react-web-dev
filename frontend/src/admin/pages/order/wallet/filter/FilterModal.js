import {
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Tree, Modal } from "antd";
import React from "react";

const treeData = [
  {
    title: 'Select All Status',
    key: 'all',
    children: [
      {
        title: 'Partial Paid',
        key: 'partial-paid',
      },
      {
        title: 'Purchased',
        key: 'purchased',
      },
      {
        title: 'Shipped from Suppliers',
        key: 'shipped-from-suppliers',
      },
      {
        title: 'Received in China Warehouse',
        key: 'received-in-china-warehouse',
      },
      {
        title: 'Shipped from China Warehouse',
        key: 'shipped-from-china-warehouse',
      },
      {
        title: 'Received in BD Warehouse',
        key: 'received-in-BD-warehouse',
      },
      {
        title: 'Order Canceled',
        key: 'cancel',
      },
      {
        title: 'Out of stock',
        key: 'out-of-stock',
      },
      {
        title: 'Missing or Cancel',
        key: 'missing',
      },
      {
        title: 'Adjustment',
        key: 'adjustment',
      },
      {
        title: 'Lost in Transit',
        key: 'lost_in_transit',
      },
      {
        title: 'Customer Tax',
        key: 'customer_tax',
      },
      {
        title: 'Refund to Customer',
        key: 'refunded',
      },
      {
        title: 'Delivered',
        key: 'delivered',
      },
    ],
  },
];

const FilterModal = ({ show, setShow, filterSelected, setFilterSelected }) => {

  const onCheck = (checkedKeys, info) => {
    setFilterSelected(checkedKeys);
  };


  return (
    <Modal
      title={`Filter with wallet status`}
      visible={show}
      onCancel={() => setShow(false)}
      defaultExpandedKeys={filterSelected}
      defaultSelectedKeys={filterSelected}
      defaultCheckedKeys={filterSelected}
      icon={<ExclamationCircleOutlined />}
      width={400}
      footer={false}
    >
      <Tree
        defaultExpandAll
        allowDrop={false}
        checkable
        onCheck={onCheck}
        treeData={treeData}
      />
    </Modal>
  );
};

export default FilterModal;
