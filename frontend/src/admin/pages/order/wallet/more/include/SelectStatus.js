import React, {useEffect, useState} from 'react';
import {Select, Form} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

const {Option} = Select;

const SelectStatus = ({form, walletItem, setStatus}) => {

  const options = [
    {key: 'partial-paid', value: 'Partial Paid'},
    {key: 'purchased', value: 'Purchased'},
    {key: 'shipped-from-suppliers', value: 'Shipped from Suppliers'},
    {key: 'received-in-china-warehouse', value: 'Received in China Warehouse'},
    {key: 'shipped-from-china-warehouse', value: 'Shipped from China Warehouse'},
    {key: 'received-in-BD-warehouse', value: 'Received in BD Warehouse'},
    {key: 'cancel', value: 'Cancel Order'},
    {key: 'out-of-stock', value: 'Missing or Shortage'},
    {key: 'adjustment', value: 'Adjustment'},
    {key: 'lost_in_transit', value: 'Lost in Transit'},
    {key: 'customer_tax', value: 'Customer Tax'},
    {key: 'refunded', value: 'Refund to Customer'},
    {key: 'comment1', value: 'Comment 1'},
    {key: 'comment2', value: 'Comment 2'},
  ];

  const statusUpdateAction = (item) => {
    setStatus(item);
    form.setFieldsValue({...walletItem, status: item});
  }

  return (
    <Form.Item
      label="Select Wallet Status"
      tooltip={{
        title: 'Select your status for change',
        icon: <InfoCircleOutlined/>,
      }}
      name="status"
      rules={[
        {
          required: true,
          message: 'Please select status ',
        },
      ]}
    >
      <Select
        showSearch
        style={{width: '100%'}}
        onChange={item => statusUpdateAction(item)}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
        // filterSort={(optionA, optionB) =>
        //   optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        // }
      >
        {
          options.map((opItem, key) => (
            <Option key={key} value={opItem.key}>{opItem.value}</Option>
          ))
        }
      </Select>
    </Form.Item>
  );
};

export default SelectStatus;