import {Form, Modal, Button} from "antd";
import React, {useEffect, useState} from "react";
import SelectStatus from "./include/SelectStatus";
import NumberInput from "./include/CustomInput";
import CustomInput from "./include/CustomInput";
import OutOfStockInput from "./include/OutOfStockInput";
import RefundedInput from "./include/RefundedInput";


const ChangeStatus = ({walletItem, show, setShow}) => {
  const [status, setStatus] = useState(walletItem?.status || '');
  const [sourceOrderNum, setSourceOrderNum] = useState(walletItem?.source_order_number || '');
  const [trackingNumber, setTrackingNumber] = useState(walletItem?.tracking_number || '');
  const [actualWeight, setActualWeight] = useState(walletItem?.actual_weight || '');
  const [outOfStock, setOutOfStock] = useState(0);
  const [adjustment, setAdjustment] = useState(walletItem?.adjustment || '');
  const [customerTax, setCustomerTax] = useState(walletItem?.customer_tax || '');
  const [refunded, setRefunded] = useState(walletItem?.refunded || '');
  const [lostTnTransit, setLostTnTransit] = useState(walletItem?.lost_in_transit || '');


  const submitModalForm = () => {
    console.log('status', status)
  }


  return (
    <>
      <Modal
        title={`Changes Status #${walletItem.item_number}`}
        okText="Change Status"
        visible={show}
        onOk={() => submitModalForm()}
        onCancel={() => setShow(false)}
        footer={(<Button type="primary" block onClick={() => submitModalForm()}>
          Update Status
        </Button>)}
      >
        <Form layout="vertical">
          <SelectStatus status={status} setStatus={setStatus}/>
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
            <OutOfStockInput product_value={walletItem.product_value} value={outOfStock} setValue={setOutOfStock}/>
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
            <RefundedInput value={refunded} setValue={setRefunded}/>
          }
          {
            status === "lost_in_transit" &&
            <CustomInput status={status} value={lostTnTransit} setValue={setLostTnTransit}/>
          }
        </Form>
      </Modal>
    </>
  );
};

export default ChangeStatus;
