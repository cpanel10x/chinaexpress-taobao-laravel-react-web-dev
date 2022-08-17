import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import InputNumberField from "../../../../../../components/InputNumberField";


const InputStatus = ({ label, title, name, required, message, placeholder, type }) => {


    return (
        <Form.Item
            label={label}
            tooltip={{
                title: title,
                icon: <InfoCircleOutlined />,
            }}
            name={name}
            rules={[
                {
                    required: required,
                    message: message,
                },
            ]}
        >
            {
                type === 'number' ?
                    <InputNumberField placeholder={placeholder} />
                    :
                    <Input placeholder={placeholder} />

            }
        </Form.Item>
    );
}

export default InputStatus;