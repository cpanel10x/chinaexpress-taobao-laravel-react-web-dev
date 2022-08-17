import { Form, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import SelectStatus from "./include/SelectStatus";
import OutOfStockInput from "./include/OutOfStockInput";
import RefundedInput from "./include/RefundedInput";
import InputStatus from "./include/InputStatus";
import InputTextArea from "./include/InputTextArea";

const ChangeStatus = ({ walletItem, onFinish, show, setShow }) => {
  const [form] = Form.useForm();

  const [status, setStatus] = useState('');

  useEffect(() => {
    let current_status = walletItem?.status || '';
    if (current_status === 'lost_in_transit') {
      form.setFieldsValue({
        ...walletItem,
        lost_in_transit: walletItem.product_value,
      });
    } else if (current_status === 'cancel') {
      let comment = walletItem?.tracking_exceptional?.find(find => find.status === current_status)?.comment || '';
      form.setFieldsValue({
        ...walletItem,
        comment,
      });
    } else {
      form.setFieldsValue(walletItem);
    }
    setStatus(current_status);
  }, [walletItem])

  return (
    <>
      <Modal
        title={`Changes Status #${walletItem.item_number}`}
        okText="Change Status"
        visible={show}
        onCancel={() => setShow(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          name="status_change_form"
          onFinish={onFinish}
        >
          <SelectStatus
            form={form}
            status={status}
            setStatus={setStatus}
            walletItem={walletItem}
          />
          {status === "purchased" && (
            <InputStatus
              label="Source Order Number"
              title="Source Order Number"
              name="source_order_number"
              required={true}
              message="Input your Source Order Number"
              placeholder="Source Order Number"
            />
          )}
          {status === "shipped-from-suppliers" && (
            <InputStatus
              label="Tracking Number"
              title="Tracking Number"
              name="tracking_number"
              required={true}
              message="Input Tracking Number"
              placeholder="Tracking Number"
            />
          )}
          {status === "received-in-BD-warehouse" && (
            <InputStatus
              type="number"
              required={true}
              label="Actual Weight"
              title="Actual Weight"
              name="actual_weight"
              message="Input Actual Weight"
              placeholder="Actual Weight"
            />
          )}

          {status === "out-of-stock" && (
            <OutOfStockInput
              form={form}
              product_value={walletItem.product_value}
              out_of_stock={walletItem.out_of_stock}
            />
          )}
          {status === "adjustment" && (
            <InputStatus
              type="number"
              required={true}
              label="Adjustment"
              title="Adjustment Amount(+/-) of this item"
              name="adjustment"
              message="Input Adjustment"
              placeholder="Adjustment"
            />
          )}
          {status === "lost_in_transit" && (
            <InputStatus
              type="number"
              required={true}
              label="Max value of lost"
              title="Lost in Transit"
              name="lost_in_transit"
              message="Input Max value of lost"
              placeholder="Max value of lost"
            />
          )}
          {status === "customer_tax" && (
            <InputStatus
              type="number"
              required={true}
              label="Customer Tax"
              title="Customer Tax Amount"
              name="customer_tax"
              message="Input Customer Tax Amount"
              placeholder="Input Tax Amount"
            />
          )}
          {status === "refunded" && <RefundedInput form={form} walletItem={walletItem} />}

          {status === "cancel" && (
            <InputTextArea
              required={true}
              label="Cancel Comment"
              title="Cancel Comment"
              name="comment"
              message="Input Cancel Comment"
              maxLength={100}
              placeholder="Cancel Comment" />
          )}
          {status === "comment1" && (
            <InputTextArea
              required={true}
              label="First Comment"
              title="First Comment"
              name="comment1"
              message="Input First Comment"
              maxLength={300}
              placeholder="First Comment" />
          )}
          {status === "comment2" && (
            <InputTextArea
              required={true}
              label="Second Comment"
              title="First Comment"
              name="comment2"
              message="Input Second Comment"
              maxLength={300}
              placeholder="Second Comment" />
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
