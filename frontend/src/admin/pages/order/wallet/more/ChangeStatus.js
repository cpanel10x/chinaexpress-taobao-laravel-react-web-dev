import {Form, Modal, Button} from "antd";
import React, {useEffect, useState} from "react";
import SelectStatus from "./include/SelectStatus";
import CustomInput from "./include/CustomInput";
import OutOfStockInput from "./include/OutOfStockInput";
import RefundedInput from "./include/RefundedInput";
import {useWalletUpdateStatus} from "../../../../query/WalletApi";


const ChangeStatus = ({walletItem, onFinish, show, setShow}) => {

  const [form] = Form.useForm();

  const [status, setStatus] = useState(walletItem?.status);
  const [sourceOrderNum, setSourceOrderNum] = useState(walletItem?.source_order_number);
  const [trackingNumber, setTrackingNumber] = useState(walletItem?.tracking_number);
  const [actualWeight, setActualWeight] = useState(walletItem?.actual_weight);
  const [adjustment, setAdjustment] = useState(walletItem?.adjustment);
  const [customerTax, setCustomerTax] = useState(walletItem?.customer_tax);
  const [refunded, setRefunded] = useState(walletItem?.refunded);
  const [lostTnTransit, setLostTnTransit] = useState(walletItem?.lost_in_transit);


  useEffect(() => {
    form.setFieldsValue({...walletItem, status});
  }, [walletItem, status])


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
        <Form layout="vertical" form={form} name="status_change_form" onFinish={onFinish}>
          <SelectStatus form={form} walletItem={walletItem} status={status} setStatus={setStatus}/>
          {
            status === "purchased" &&
            <CustomInput status={status} value={sourceOrderNum} setValue={setSourceOrderNum}/>
          }
          {
            status === "shipped-from-suppliers" &&
            <CustomInput status={status} value={trackingNumber} setValue={setTrackingNumber}/>
          }
          {
            status === "received-in-BD-warehouse" &&
            <CustomInput status={status} value={actualWeight} setValue={setActualWeight}/>
          }
          {
            status === "out-of-stock" &&
            <OutOfStockInput form={form} product_value={walletItem.product_value}
                             out_of_stock={walletItem.out_of_stock}/>
          }
          {
            status === "adjustment" &&
            <CustomInput status={status} value={adjustment} setValue={setAdjustment}/>
          }
          {
            status === "customer_tax" &&
            <CustomInput status={status} value={customerTax} setValue={setCustomerTax}/>
          }
          {
            status === "refunded" &&
            <RefundedInput form={form} value={refunded} setValue={setRefunded}/>
          }
          {
            status === "lost_in_transit" &&
            <CustomInput status={status} value={lostTnTransit} setValue={setLostTnTransit}/>
          }
          <Button type="primary" htmlType="submit" block>
            Update Status
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeStatus;
