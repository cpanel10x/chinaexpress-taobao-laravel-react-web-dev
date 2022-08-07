import {InfoCircleOutlined} from '@ant-design/icons';
import {Radio, Form, Select} from 'antd';
import InputNumberField from "../../../../../../components/InputNumberField";
import {useEffect, useState} from "react";

const {Option} = Select;

const RefundedInput = ({form, refunded, refund_payment_method}) => {

  // const [method, setMethod] = useState('Cash');


  useEffect(() => {
    form.setFieldsValue({
      refunded: refunded,
      refund_payment_method: refund_payment_method,
    });
  }, [refunded, refund_payment_method])


  return (
    <>
      <Form.Item
        label="Refund payment method"
        name="refund_payment_method"
        tooltip={{
          title: 'Type out of stock amount for this item',
          icon: <InfoCircleOutlined/>,
        }}
        rules={[
          {
            required: true,
            message: 'Select refund payment method',
          },
        ]}
      >
        <Select
          style={{width: '100%',}}
        >
          <Option value="cash">Cash</Option>
          <Option value="bkash">Bkash</Option>
          <Option value="bank-transfer">Bank Transfer</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Refunded Amount"
        name="refunded"
        tooltip={{
          title: 'Refunded Amount of the Product',
          icon: <InfoCircleOutlined/>,
        }}
        rules={[
          {
            required: true,
            message: 'Please input refunded amount',
          },
        ]}
      >
        <InputNumberField
        />
      </Form.Item>
    </>
  );
};

export default RefundedInput;