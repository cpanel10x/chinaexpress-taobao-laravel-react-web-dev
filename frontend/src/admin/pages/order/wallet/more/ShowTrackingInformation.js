import { Timeline, Typography, Modal } from "antd";
import React from "react";
import { useWalletTrackingInfo } from "../../../../query/WalletApi";
import TrackingItem from "./include/TrackingItem";

const { Title } = Typography;

const ShowTrackingInformation = ({ walletItem, show, setShow }) => {
  const wallet_id = walletItem?.id || null;
  const { data } = useWalletTrackingInfo(wallet_id);

  console.log("data", data);

  return (
    <>
      <Modal
        title={`Wallet Tracking Information #${walletItem.item_number}`}
        visible={show}
        onOk={() => setShow(false)}
        onCancel={() => setShow(false)}
        width={600}
        footer={false}
      >
        <Timeline>
          {data?.length > 0 &&
            data.map((item, index) => <TrackingItem item={item} key={index} />)}
        </Timeline>
      </Modal>
    </>
  );
};

export default ShowTrackingInformation;
