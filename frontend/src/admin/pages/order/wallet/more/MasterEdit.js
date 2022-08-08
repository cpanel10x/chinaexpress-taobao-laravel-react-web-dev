import {ExclamationCircleOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Button, Form, Modal, Input} from "antd";
import React, {useEffect, useState} from "react";
import {slugToMakeTitle} from "../../../../../utils/Helpers";
import {useWalletMasterUpdate} from "../../../../query/WalletApi";
import {useQueryClient} from "react-query";

const MasterEdit = ({walletItem, show, setShow, setResetQuery}) => {
  const [form] = Form.useForm();
  const [formItem, setFormItem] = useState([]);
  const wallet_id = walletItem?.id || null;

  const cache = useQueryClient();
  const {mutateAsync, isLoading} = useWalletMasterUpdate(wallet_id);

  useEffect(() => {
    let wallet_collection = [];
    let exceptItems = ['id', 'order_id', 'user_id', 'item_number', 'hasConfigurators', 'ItemId', 'shipped_by', 'shipping_from', 'status', 'purchases_at', 'created_at', 'updated_at', 'deleted_at', 'user', 'order', 'product', 'item_variations'];
    for (let key in walletItem) {
      if (!exceptItems.includes(key)) {
        wallet_collection.push({
          key: key,
          value: walletItem[key]
        });
      }
    }
    setFormItem(wallet_collection);
    form.setFieldsValue(walletItem);

  }, [walletItem]);

  const onFinish = (values) => {
    mutateAsync(values,
      {
        onSuccess: () => {
          setResetQuery(true);
          setShow(false);
        },
      }
    ).then((r) => console.log(r.data));
  };

  return (
    <>
      <Modal
        title={`Always be careful for Master Edit #${walletItem.item_number} !`}
        visible={show}
        onCancel={() => setShow(false)}
        icon={<ExclamationCircleOutlined/>}
        width={600}
        footer={false}
      >
        <Form
          layout="vertical"
          form={form}
          name="status_change_form"
          onFinish={onFinish}
        >
          {
            formItem.map((item, index) => (
              <Form.Item
                key={index}
                label={slugToMakeTitle(item.key)}
                tooltip={{
                  title: `Input your ${slugToMakeTitle(item.key)}`,
                  icon: <InfoCircleOutlined/>,
                }}
                name={item.key}
              >
                <Input placeholder={slugToMakeTitle(item.key)}/>
              </Form.Item>
            ))
          }
          <Button type="primary" htmlType="submit" block>
            Master Update
          </Button>
        </Form>

      </Modal>
    </>
  );
};

export default MasterEdit;
