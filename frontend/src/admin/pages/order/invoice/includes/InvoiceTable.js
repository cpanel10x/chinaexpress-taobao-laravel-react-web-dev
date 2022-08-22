import React, { useEffect, useState } from "react";
import { Button, Dropdown, Table } from "antd";
import moment from "moment/moment";
import { SettingOutlined } from "@ant-design/icons";
import qs from "qs";
import { useQueryClient } from "react-query";
import InvoiceAction from "./InvoiceAction";
import useInvoice from "../../../../query/invoiceQuery";

const getRandomParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});



const InvoiceTable = ({ rowSelection, handleActionClick, resetQuery, setResetQuery, search, canMasterEdit }) => {
    const [data, setData] = useState();
    const [loadSearch, setLoadSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const [queryParams, setQueryParams] = useState({});

    const qs_query_prams = qs.stringify(getRandomParams(queryParams));

    const cache = useQueryClient();
    const { list } = useInvoice(qs_query_prams);

    useEffect(() => {
        if (search !== loadSearch) {
            setPagination({
                current: 1,
                pageSize: 10,
            })
            setQueryParams({ ...queryParams, search: loadSearch });
            setLoadSearch(search);
        }

        if (resetQuery) {
            cache.invalidateQueries(["wallet", qs_query_prams]);
            setResetQuery(false);
        }

    }, [resetQuery, search, loadSearch, cache, qs_query_prams, setResetQuery]);


    useEffect(() => {
        setLoading(list.isLoading);
        setData(list?.data?.data);
        setPagination({
            ...queryParams.pagination,
            total: list.data?.totalRecords || 0,
        });
    }, [list, queryParams, search]);

    const handleTableChange = (newPagination, filters, sorter) => {
        setQueryParams({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };

    return (
        <>
            <Table
                rowSelection={rowSelection}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: (event) => handleActionClick(event, "change-status", record),
                    };
                }}
                scroll={{
                    x: 1200,
                    y: 600,
                }}
                bordered
                columns={[
                    {
                        title: "Date",
                        dataIndex: "created_at",
                        fixed: "left",
                        align: "center",
                        width: 120,
                        render: (text, record,) => {
                            return record?.created_at
                                ? moment(record.created_at).format("DD-MMM-YYYY")
                                : "N/A";
                        },
                    },
                    {
                        title: "Invoice ID",
                        align: "center",
                        fixed: "left",
                        width: 100,
                        dataIndex: "invoice_no",
                    },
                    {
                        title: "Customer",
                        align: "center",
                        fixed: "left",
                        width: 100,
                        dataIndex: "customer_name",
                    },
                    {
                        title: "Customer Phone",
                        align: "center",
                        fixed: "left",
                        width: 100,
                        dataIndex: "customer_phone",
                    },
                    {
                        title: "Payment Method",
                        align: "center",
                        fixed: "left",
                        width: 100,
                        dataIndex: "payment_method",
                    },
                    {
                        title: "Delivery Method",
                        align: "center",
                        fixed: "left",
                        width: 100,
                        dataIndex: "delivery_method",
                    },
                    {
                        title: "Total Payable",
                        align: "center",
                        fixed: "left",
                        width: 100,
                        dataIndex: "total_payable",
                    },
                    {
                        title: "Status",
                        align: "center",
                        fixed: "left",
                        width: 130,
                        dataIndex: "status",
                        filters: [
                            { text: 'Partial Paid', value: 'partial-paid', },
                            { text: 'Purchased', value: 'purchased', },
                            { text: 'Shipped from Suppliers', value: 'shipped-from-suppliers', },
                            { text: 'Received in China Warehouse', value: 'received-in-china-warehouse', },
                            { text: 'Shipped from China Warehouse', value: 'shipped-from-china-warehouse', },
                            { text: 'Received in BD Warehouse', value: 'received-in-BD-warehouse', },
                            { text: 'Order Canceled', value: 'cancel', },
                            { text: 'Out of stock', value: 'out-of-stock', },
                            { text: 'Missing or Cancel', value: 'missing', },
                            { text: 'Adjustment', value: 'adjustment', },
                            { text: 'Lost in Transit', value: 'lost_in_transit', },
                            { text: 'Customer Tax', value: 'customer_tax', },
                            { text: 'Refund to Customer', value: 'refunded', },
                            { text: 'Delivered', value: 'delivered', },
                        ],
                        filterMode: 'tree',
                        filterSearch: true,
                        onFilter: (value, record) => {
                            return true;
                        }
                    },
                    {
                        title: "Action",
                        fixed: "right",
                        width: 75,
                        key: "action",
                        align: "center",
                        render: (walletItem) => (
                            <Dropdown
                                overlay={
                                    <InvoiceAction
                                        walletItem={walletItem}
                                        handleActionClick={handleActionClick}
                                        canMasterEdit={canMasterEdit}
                                    />
                                }
                                placement="bottomRight"
                            >
                                <Button type="link" onClick={(e) => e.preventDefault()} icon={<SettingOutlined />} />
                            </Dropdown>
                        ),
                    },
                ]}
            />
        </>
    );
}

export default InvoiceTable;