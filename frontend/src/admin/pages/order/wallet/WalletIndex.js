import { Typography } from "antd";
import React, { useState } from "react";
import { useWalletUpdateStatus } from "../../../query/WalletApi";
import WalletTable from "./WalletTable";
import ViewDetails from "./more/ViewDetails";
import ChangeStatus from "./more/ChangeStatus";
import ShowTrackingInformation from "./more/ShowTrackingInformation";
import MasterEdit from "./master-edit/MasterEdit";
import OperationButtons from "./includes/OperationButtons";
import { has_permission } from "../../../../api/Auth";
import FilterModal from "./filter/FilterModal";

const { Title } = Typography;

const WalletIndex = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [resetQuery, setResetQuery] = useState(false);
  const [search, setSearch] = useState("");

  const [walletItem, setWalletItem] = useState({});
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [masterEdit, setMasterEdit] = useState(false);
  const [filter, setFilter] = useState(false);
  const [filterSelected, setFilterSelected] = useState([]);

  const { mutateAsync, isLoading } = useWalletUpdateStatus();

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
      { ...values, item_id: walletItem.id },
      {
        onSuccess: () => {
          setResetQuery(true);
          setShowStatus(false);
        },
      }
    ).then((r) => console.log(r.data));
  };


  const can_status = has_permission('recent.order.change.status');
  const can_details = has_permission('wallet.view.details');
  const canMasterEdit = has_permission('wallet.master.edit');

  return (
    <>
      {walletItem?.id > 0 && can_details && (
        <>
          {show && (
            <ViewDetails
              walletItem={walletItem}
              show={show}
              setShow={setShow}
            />
          )}
          {showStatus && can_status && (
            <ChangeStatus
              walletItem={walletItem}
              onFinish={onFinish}
              show={showStatus}
              setShow={setShowStatus}
              setResetQuery={setResetQuery}
              isLoading={isLoading}
            />
          )}
          {showTracking && (
            <ShowTrackingInformation
              walletItem={walletItem}
              show={showTracking}
              setShow={setShowTracking}
            />
          )}
          {masterEdit && canMasterEdit && (
            <MasterEdit
              walletItem={walletItem}
              show={masterEdit}
              setShow={setMasterEdit}
              setResetQuery={setResetQuery}
            />
          )}
        </>
      )}
      {filter && (
        <FilterModal
          show={filter}
          setShow={setFilter}
          filterSelected={filterSelected}
          setFilterSelected={setFilterSelected}
        />
      )}
      <Title level={4}>Manage Wallet</Title>

      <OperationButtons
        selectedRowKeys={selectedRowKeys}
        setResetQuery={setResetQuery}
        setSearch={setSearch}
        setFilter={setFilter}
      />

      <WalletTable
        rowSelection={rowSelection}
        filterSelected={filterSelected}
        handleActionClick={handleActionClick}
        resetQuery={resetQuery}
        setResetQuery={setResetQuery}
        search={search}
        canMasterEdit={canMasterEdit}
      />
    </>
  );
};

export default WalletIndex;
