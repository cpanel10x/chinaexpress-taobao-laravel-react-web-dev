import { InfoCircleOutlined } from "@ant-design/icons";
import { Radio, Form, Select } from "antd";
import InputNumberField from "../../../../../../components/InputNumberField";
import { useEffect, useState } from "react";
import InputStatus from "./InputStatus";

const { Option } = Select;

const RefundedInput = ({ form, walletItem }) => {

  form.setFieldsValue({ refunded: walletItem.refunded, refund_payment_method: 'cash' });

  return (
    <>
      <Form.Item
        label="Refund payment method"
        name="refund_payment_method"
        tooltip={{
          title: "Type out of stock amount for this item",
          icon: <InfoCircleOutlined />,
        }}
        rules={[
          {
            required: true,
            message: "Select refund payment method",
          },
        ]}
      >
        <Select style={{ width: "100%" }}>
          <Option value="cash">Cash</Option>
          <Option value="bkash">Bkash</Option>
          <Option value="bank-transfer">Bank Transfer</Option>
        </Select>
      </Form.Item>

      <InputStatus
        type="number"
        required={true}
        label="Refunded Amount"
        title="Refunded Amount of the Product"
        name="refunded"
        message="Input Refunded Amount of the Product"
        placeholder="Refunded Amount"
      />
    </>
  );
};

export default RefundedInput;
