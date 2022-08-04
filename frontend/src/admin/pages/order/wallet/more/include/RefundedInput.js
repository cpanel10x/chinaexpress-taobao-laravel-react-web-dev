import {InfoCircleOutlined} from '@ant-design/icons';
import {Radio, Form, Select} from 'antd';
import InputNumberField from "../../../../../../components/InputNumberField";
import {useEffect, useState} from "react";

const {Option} = Select;

const RefundedInput = ({value, setValue}) => {

  const [method, setMethod] = useState('Cash');
  const [refund, setRefund] = useState(value.refund);

  useEffect(() => {
    setValue({
      method,
      refund
    })

  }, [method, refund, setValue])

  return (
    <>
      <Form.Item
        label="Out of stock"
        tooltip={{
          title: 'Type out of stock amount for this item',
          icon: <InfoCircleOutlined/>,
        }}
      >
        <Select
          defaultValue={method}
          style={{width: '100%',}}
          onChange={item => setMethod(item.value)}
        >
          <Option value="cash">Cash</Option>
          <Option value="bkash">Bkash</Option>
          <Option value="bank-transfer">Bank Transfer</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Refunded Amount"
        tooltip={{
          title: 'Refunded Amount of the Product',
          icon: <InfoCircleOutlined/>,
        }}
      >
        <InputNumberField
          value={refund}
          onChange={setRefund}
        />
      </Form.Item>
    </>
  );
};

export default RefundedInput;