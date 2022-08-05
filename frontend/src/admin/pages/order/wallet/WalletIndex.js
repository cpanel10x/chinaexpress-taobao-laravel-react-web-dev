import {Table, Button, Typography, Dropdown} from "antd";
import qs from "qs";
import moment from "moment";
import React, {useState, useEffect} from "react";
import {useWalletData} from "../../../query/WalletApi";
import {MoreOutlined} from "@ant-design/icons";
import Action from "./more/Action";
import {characterLimiter} from "../../../../utils/Helpers";
import WalletTable from "./WalletTable";
import ViewDetails from "./more/ViewDetails";
import ChangeStatus from "./more/ChangeStatus";
import ShowTrackingInformation from "./more/ShowTrackingInformation";

const {Title} = Typography;


const WalletIndex = () => {

  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [walletItem, setWalletItem] = useState({});
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showTracking, setShowTracking] = useState(false);


  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("selectedRows: ", selectedRows);
      setSelectedRowKeys(selectedRows);
    },
  };

  const handleActionClick = (event, type, record) => {
    event.preventDefault();
    setWalletItem(record)
    if (type === 'view') {
      setShow(true);
    } else if (type === 'change-status') {
      setShowStatus(true);
    } else if (type === 'tracking') {
      setShowTracking(true);
    }

    console.log('type', type)

  }

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      {
        walletItem?.id > 0 && (
          <>
            {show && <ViewDetails walletItem={walletItem} show={show} setShow={setShow}/>}
            {showStatus && <ChangeStatus walletItem={walletItem} show={showStatus} setShow={setShowStatus}/>}
            {showTracking && <ShowTrackingInformation walletItem={walletItem} show={showTracking} setShow={setShowTracking}/>}
          </>
        )
      }
      <Title level={4}>Manage Wallet</Title>

      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>

      <WalletTable
        rowSelection={rowSelection}
        handleActionClick={handleActionClick}/>

    </>
  );
};

export default WalletIndex;
