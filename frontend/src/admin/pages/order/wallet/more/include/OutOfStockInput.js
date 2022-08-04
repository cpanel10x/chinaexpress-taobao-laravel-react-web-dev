import {InfoCircleOutlined} from '@ant-design/icons';
import {Radio, Form, Input} from 'antd';
import InputNumberField from "../../../../../../components/InputNumberField";
import {useEffect, useState} from "react";


const OutOfStockInput = ({product_value, value, setValue}) => {

  const [full, setFull] = useState(product_value);
  const [partial, setPartial] = useState(0);
  const [option, setOption] = useState('partial');

  useEffect(() => {
    if (option === 'partial') {
      setValue(partial)
    } else if (option === 'full') {
      setValue(full)
    }
  }, [partial, full, option]);

  return (
    <>
      <Form.Item
        label="Out of stock"
        tooltip={{
          title: 'Type out of stock amount for this item',
          icon: <InfoCircleOutlined/>,
        }}
      >
        <Radio.Group defaultValue="partial" buttonStyle="solid" onChange={e => setOption(e.target.value)}>
          <Radio.Button value="partial">Partial</Radio.Button>
          <Radio.Button value="full">Full Out of Stock</Radio.Button>
        </Radio.Group>
        <br/>
        <br/>
        {
          option === 'full' ? (
              <InputNumberField
                value={full}
                onChange={setFull}
              />
            )
            :
            (
              <InputNumberField
                value={partial}
                onChange={setPartial}
              />
            )
        }
      </Form.Item>
    </>
  );
};

export default OutOfStockInput;