import { Table, Button, Typography, Dropdown } from "antd";
import qs from "qs";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useWalletData } from "../../../query/WalletApi";
import { MoreOutlined } from "@ant-design/icons";
import { ActionOptions } from "./includes/Action";
const { Title } = Typography;

const fixedColumns = [
  {
    title: "Date",
    dataIndex: "created_at",
    fixed: "left",
    width: 130,
    render: (text, record, index) => {
      return moment(record.created_at).format("DD-MMM-YYYY ");
    },
  },
  {
    title: "Order Number",
    align: "center",
    fixed: "left",
    width: 150,
    dataIndex: "item_number",
  },
  {
    title: "Transaction Number",
    width: 200,
    render: (item) => {
      return item.order.transaction_id;
    },
  },
  {
    title: "Customer",
    width: 200,
    render: (item) => {
      return item.order.name;
    },
  },
  {
    title: "Source Site",
    width: 150,
    dataIndex: "ProviderType",
  },
  {
    title: "Shipping Method",
    width: 150,
    dataIndex: "shipping_type",
  },
  {
    title: "Shipping Rate",
    width: 150,
    dataIndex: "shipping_rate",
  },
  {
    title: "Source Order Number",
    width: 150,
    dataIndex: "source_order_number",
  },
  {
    title: "TrackingNo",
    width: 150,
    dataIndex: "tracking_number",
  },
  {
    title: "Title",
    width: 250,
    dataIndex: "Title",
  },
  {
    title: "Source Link",
    width: 150,
    render: (item) => {
      return item.order.phone;
    },
  },
  {
    title: "Quantity",
    width: 150,
    align: "center",
    dataIndex: "Quantity",
  },
  {
    title: "Comment1",
    width: 300,
    dataIndex: "comment1",
  },
  {
    title: "Comment2",
    width: 300,
    dataIndex: "comment2",
  },
  {
    title: "Action",
    fixed: "right",
    width: 100,
    key: "action",
    align: "center",
    render: (options) => (
      <Dropdown overlay={() => ActionOptions(options)} placement="bottomRight">
        <a href="/more" onClick={(e) => e.preventDefault()}>
          More <MoreOutlined />
        </a>
      </Dropdown>
    ),
  },
];

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const Wallet = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [queryParams, setQueryParams] = useState({});

  const { data: queryData, isLoading } = useWalletData(
    qs.stringify(getRandomuserParams(queryParams))
  );

  useEffect(() => {
    setLoading(isLoading);
    setData(queryData?.data);
    setPagination({
      ...queryParams.pagination,
      total: queryData?.totalRecords ?? 0,
    });
  }, [queryData, isLoading, queryParams]);

  const handleTableChange = (newPagination, filters, sorter) => {
    setQueryParams({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

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

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
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

      <Table
        rowSelection={rowSelection}
        columns={fixedColumns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{
          x: 1200,
          y: 500,
        }}
        bordered
      />
    </>
  );
};

export default Wallet;
