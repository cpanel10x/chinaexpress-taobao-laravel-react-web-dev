import {Timeline, Typography, Modal} from "antd";
import React, {useEffect, useState} from "react";

const {Title} = Typography;

const ShowTrackingInformation = ({walletItem, show, setShow}) => {

  return (
    <>
      <Modal
        title={`Wallet Tracking Information #${walletItem.item_number}`}
        visible={show}
        onOk={() => setShow(false)}
        onCancel={() => setShow(false)}
        width={800}
        footer={false}
      >
        <Timeline>
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
      </Modal>
    </>
  );
};

export default ShowTrackingInformation;
