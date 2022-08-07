import {InfoCircleOutlined} from '@ant-design/icons';
import {Form, Input} from 'antd';
import InputNumberField from "../../../../../../components/InputNumberField";


const CustomInput = ({status, value, setValue}) => {

  if (status === 'purchased') {
    return (
      <Form.Item
        label="Source Order Number"
        tooltip={{
          title: 'Source Order Number',
          icon: <InfoCircleOutlined/>,
        }}
        name="source_order_number"
        rules={[
          {
            required: true,
            message: 'Please input your Source Order Number!',
          },
        ]}
      >
        <Input value={value} onChange={setValue} placeholder="input placeholder"/>
      </Form.Item>
    );
  }
  if (status === 'shipped-from-suppliers') {
    return (
      <Form.Item
        label="Tracking Number"
        tooltip={{
          title: 'Tracking Number',
          icon: <InfoCircleOutlined/>,
        }}
        name="tracking_number"
        rules={[
          {
            required: true,
            message: 'Please input your Tracking Number!',
          },
        ]}
      >
        <Input value={value} onChange={setValue} placeholder="Tracking Number"/>
      </Form.Item>
    );
  }

  if (status === 'received-in-BD-warehouse') {
    return (
      <Form.Item
        label="Actual Weight"
        tooltip={{
          title: 'Actual weight of total quantity',
          icon: <InfoCircleOutlined/>,
        }}
        name="actual_weight"
        rules={[
          {
            required: true,
            message: 'Please input your Actual Weight!',
          },
        ]}
      >
        <InputNumberField
          value={value}
          onChange={setValue}
        />
      </Form.Item>
    );
  }

  if (status === 'adjustment') {
    return (
      <Form.Item
        label="Adjustment"
        tooltip={{
          title: 'Adjustment Amount(+/-) of this item',
          icon: <InfoCircleOutlined/>,
        }}
        name="adjustment"
        rules={[
          {
            required: true,
            message: 'Please input your Adjustment Amount',
          },
        ]}
      >
        <InputNumberField
          value={value}
          onChange={setValue}
        />
      </Form.Item>
    );
  }

  if (status === 'customer_tax') {
    return (
      <Form.Item
        label="Customer Tax"
        tooltip={{
          title: 'Customer Tax amount',
          icon: <InfoCircleOutlined/>,
        }}
        name="customer_tax"
        rules={[
          {
            required: true,
            message: 'Please input Customer Tax',
          },
        ]}
      >
        <InputNumberField
          value={value}
          onChange={setValue}
        />
      </Form.Item>
    );
  }

  if (status === 'lost_in_transit') {
    return (
      <Form.Item
        label="Lost in Transit"
        tooltip={{
          title: 'Lost in Transit amount',
          icon: <InfoCircleOutlined/>,
        }}
        name="lost_in_transit"
        rules={[
          {
            required: true,
            message: 'Please input lost in transit',
          },
        ]}
      >
        <InputNumberField
          value={value}
          onChange={setValue}
        />
      </Form.Item>
    );
  }

  return '';
};

export default CustomInput;