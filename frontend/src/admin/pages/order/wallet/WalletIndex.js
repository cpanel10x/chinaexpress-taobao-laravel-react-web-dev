import {Button, Typography} from "antd";
import React, {useState} from "react";
import {useWalletUpdateStatus} from "../../../query/WalletApi";
import WalletTable from "./WalletTable";
import ViewDetails from "./more/ViewDetails";
import ChangeStatus from "./more/ChangeStatus";
import ShowTrackingInformation from "./more/ShowTrackingInformation";
import MasterEdit from "./more/MasterEdit";
import OperationButtons from "./includes/OperationButtons";

const {Title} = Typography;

const WalletIndex = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [resetQuery, setResetQuery] = useState(false);

  const [walletItem, setWalletItem] = useState({});
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [masterEdit, setMasterEdit] = useState(false);

  const {mutateAsync, isLoading} = useWalletUpdateStatus();

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRows);
    },
  };

  const handleActionClick = (event, type, record) => {
    event.preventDefault();
    setWalletItem(record);
    if (type === "view") {
      setShow(true);
    } else if (type === "change-status") {
      setShowStatus(true);
    } else if (type === "tracking") {
      setShowTracking(true);
    } else if (type === "master_edit") {
      setMasterEdit(true);
    }
  };

  const onFinish = (values) => {
    mutateAsync(
      {...values, item_id: walletItem.id},
      {
        onSuccess: () => {
          setResetQuery(true);
          setShowStatus(false);
        },
      }
    ).then((r) => console.log(r.data));
  };

  return (
    <>
      {walletItem?.id > 0 && (
        <>
          {show && (
            <ViewDetails
              walletItem={walletItem}
              show={show}
              setShow={setShow}
            />
          )}
          {showStatus && (
            <ChangeStatus
              walletItem={walletItem}
              onFinish={onFinish}
              show={showStatus}
              setShow={setShowStatus}
              setResetQuery={setResetQuery}
            />
          )}
          {showTracking && (
            <ShowTrackingInformation
              walletItem={walletItem}
              show={showTracking}
              setShow={setShowTracking}
            />
          )}
          {masterEdit && (
            <MasterEdit
              walletItem={walletItem}
              show={masterEdit}
              setShow={setMasterEdit}
              setResetQuery={setResetQuery}
            />
          )}
        </>
      )}
      <Title level={4}>Manage Wallet</Title>

      <OperationButtons selectedRowKeys={selectedRowKeys} setResetQuery={setResetQuery}/>

      <WalletTable
        rowSelection={rowSelection}
        handleActionClick={handleActionClick}
        resetQuery={resetQuery}
        setResetQuery={setResetQuery}
      />
    </>
  );
};

export default WalletIndex;
