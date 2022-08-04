import React, {useState} from 'react';
import {Select, Form} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

const {Option} = Select;

const SelectStatus = ({status, setStatus}) => {

  const options = [
    {key: 'purchased', value: 'Purchased'},
    {key: 'shipped-from-suppliers', value: 'Shipped from Suppliers'},
    {key: 'received-in-china-warehouse', value: 'Received in China Warehouse'},
    {key: 'shipped-from-china-warehouse', value: 'Shipped from China Warehouse'},
    {key: 'received-in-BD-warehouse', value: 'Received in BD Warehouse'},
    {key: 'on-transit-to-customer', value: 'On Transit to Customer'},
    {key: 'out-of-stock', value: 'Out of Stock'},
    {key: 'adjustment', value: 'Adjustment'},
    {key: 'customer_tax', value: 'Customer Tax'},
    {key: 'refunded', value: 'Refunded'},
    {key: 'delivered', value: 'Delivered'},
    {key: 'lost_in_transit', value: 'Lost in Transit'},
    {key: 'waiting-for-payment', value: 'Waiting for Payment'},
    {key: 'partial-paid', value: 'Partial Paid'},
  ];

  const default_value = options?.find(find => find.key === status)?.value || '';

  return (
    <Form.Item
      label="Select Wallet Status"
      tooltip={{
        title: 'Select your status for change',
        icon: <InfoCircleOutlined/>,
      }}
    >
      <Select
        defaultValue={default_value}
        labelInValue
        showSearch
        style={{width: '100%'}}
        onChange={item => setStatus(item.value)}
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