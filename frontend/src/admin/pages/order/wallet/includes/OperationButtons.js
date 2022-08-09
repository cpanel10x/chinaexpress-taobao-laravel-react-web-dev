import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useWalletBatchDelete } from "../../../../query/WalletApi";
import GenerateInvoice from "./GenerateInvoice";

const { Search } = Input;

const OperationButtons = ({ selectedRowKeys, setResetQuery }) => {
  const [selected, setSelected] = useState([]);
  const [invoiceGen, setInvoiceGen] = useState(false);

  const { mutateAsync, isLoading } = useWalletBatchDelete();

  useEffect(() => {
    let selected_ids = [];
    selectedRowKeys.map((item) => {
      selected_ids.push(item.id);
      return 0;
    });
    setSelected(selected_ids);
  }, [selectedRowKeys]);

  const processDelete = () => {
    Modal.confirm({
      title: "Are you sure ?",
      icon: <ExclamationCircleOutlined />,
      content: "Attention! Selected items will be deleted.",
      okText: "Ok, Delete",
      okType: "danger",
      onOk: () => {
        mutateAsync(
          { selected },
          {
            onSuccess: () => {
              setResetQuery(true);
              setSelected([]);
            },
          }
        ).then((r) => console.log(r.data));
      },
      cancelText: "Cancel",
    });
  };

  const generateInvoice = () => {
    let same_users = true;
    let user_id = 0;
    for (let i = 0; i < selectedRowKeys.length; i++) {
      let item = selectedRowKeys[i];
      let user_id2 = item.user_id;
      if (user_id > 0 && user_id2 !== user_id) {
        same_users = false;
        break;
      }
      user_id = user_id2;
    }
    if (!same_users) {
      Modal.warning({
        title: "Processing error!",
        content:
          "Selected items is not same user or is not ready for generate invoice.",
      });
    } else {
      setInvoiceGen(true);
    }
  };

  const hasSelected = selected.length > 0;
  const onSearch = (value) => console.log(value);
  return (
    <>
      {invoiceGen && hasSelected && (
        <GenerateInvoice
          rowItems={selectedRowKeys}
          setResetQuery={setResetQuery}
          show={invoiceGen}
          setShow={setInvoiceGen}
        />
      )}
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="danger"
          onClick={processDelete}
          disabled={!hasSelected}
          loading={isLoading}
          style={{ marginRight: 4 }}
        >
          Delete
        </Button>
        <Button
          type="primary"
          onClick={generateInvoice}
          disabled={!hasSelected}
        >
          Generate Invoice
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
        <Search
          placeholder="Search"
          allowClear
          enterButton
          onSearch={onSearch}
          style={{
            width: 300,
          }}
        />
      </div>
    </>
  );
};

export default OperationButtons;
