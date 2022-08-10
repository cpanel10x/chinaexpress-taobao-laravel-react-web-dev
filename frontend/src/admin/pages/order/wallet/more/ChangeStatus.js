import { Form, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import SelectStatus from "./include/SelectStatus";
import CustomInput from "./include/CustomInput";
import OutOfStockInput from "./include/OutOfStockInput";
import RefundedInput from "./include/RefundedInput";
import { useWalletUpdateStatus } from "../../../../query/WalletApi";

const ChangeStatus = ({ walletItem, onFinish, show, setShow }) => {
  const [form] = Form.useForm();

  const [status, setStatus] = useState(walletItem?.status);

  return (
    <>
      <Modal
        title={`Changes Status #${walletItem.item_number}`}
        okText="Change Status"
        visible={show}
        // onOk={() => submitModalForm()}
        onCancel={() => setShow(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          name="status_change_form"
          onFinish={onFinish}
          initialValues={walletItem}
        >
          <SelectStatus
            form={form}
            walletItem={walletItem}
            setStatus={setStatus}
          />
          {status === "purchased" && (
            <CustomInput form={form} walletItem={walletItem} status={status} />
          )}
          {status === "shipped-from-suppliers" && (
            <CustomInput form={form} walletItem={walletItem} status={status} />
          )}
          {status === "received-in-BD-warehouse" && (
            <CustomInput form={form} walletItem={walletItem} status={status} />
          )}
          {status === "out-of-stock" && (
            <OutOfStockInput
              form={form}
              product_value={walletItem.product_value}
              out_of_stock={walletItem.out_of_stock}
            />
          )}
          {status === "adjustment" && (
            <CustomInput form={form} walletItem={walletItem} status={status} />
          )}
          {status === "customer_tax" && (
            <CustomInput form={form} walletItem={walletItem} status={status} />
          )}
          {status === "refunded" && <RefundedInput form={form}  walletItem={walletItem} />}
          {status === "lost_in_transit" && (
            <CustomInput form={form} walletItem={walletItem} status={status} />
          )}
          <Button type="primary" htmlType="submit" block>
            Update Status
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeStatus;
