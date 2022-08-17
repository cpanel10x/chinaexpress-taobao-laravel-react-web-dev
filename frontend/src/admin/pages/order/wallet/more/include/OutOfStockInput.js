import { InfoCircleOutlined } from '@ant-design/icons';
import { Radio, Form, Input } from 'antd';
import InputNumberField from "../../../../../../components/InputNumberField";
import { useEffect, useState } from "react";
import InputStatus from './InputStatus';


const OutOfStockInput = ({ product_value, out_of_stock, form }) => {

  form.setFieldsValue({ out_of_stock });


  const setOptionAction = (e) => {
    let option = e.target.value;
    if (option === 'partial') {
      form.setFieldsValue({
        out_of_stock_type: option,
        out_of_stock: out_of_stock,
      });
    } else if (option === 'full') {
      form.setFieldsValue({
        out_of_stock_type: option,
        out_of_stock: product_value,
      });
    }
  }

  return (
    <>
      <Form.Item name="out_of_stock_type">
        <Radio.Group defaultValue="partial" buttonStyle="solid" onChange={e => setOptionAction(e)}>
          <Radio.Button value="partial">Partial</Radio.Button>
          <Radio.Button value="full">Full Out of Stock</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <InputStatus
        type="number"
        label="Out of stock"
        title="Out of stock"
        name="out_of_stock"
        required={true}
        message="Input Out of stock"
        placeholder="Out of stock"
      />

    </>
  );
};

export default OutOfStockInput;