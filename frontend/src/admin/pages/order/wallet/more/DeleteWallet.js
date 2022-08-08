import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

const DeleteWallet = ({ walletItem, show, setShow }) => {
  const wallet_id = walletItem?.id || null;

  const deleteProgress = () => {
    alert("ok, will be processed");
    alert(wallet_id);

    setShow(false);
  };

  return (
    <>
      <Modal
        title={`Are you want to delete #${walletItem.item_number} ?`}
        visible={show}
        onOk={() => deleteProgress(false)}
        onCancel={() => setShow(false)}
        icon={<ExclamationCircleOutlined />}
        width={600}
        footer={false}
        content={
          "After delete this wallet Item, Customer can not show this more!"
        }
        okText="Yes, Delete"
        cancelText="Cancel"
      ></Modal>
    </>
  );
};

export default DeleteWallet;
