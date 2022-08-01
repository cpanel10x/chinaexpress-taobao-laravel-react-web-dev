import { Table, Typography, Modal, Divider, List } from "antd";
import React, { useEffect, useState } from "react";

const { Title } = Typography;

const ViewDetails = ({ walletItem, show, setShow }) => {
  const [variations, setVariations] = useState([]);

  useEffect(() => {
    setVariations(walletItem?.item_variations);
  }, [walletItem]);

  const MainPictureUrl = walletItem.MainPictureUrl;

  const columns = [
    {
      title: "SL",
      align: "center",
      width: 50,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Picture",
      align: "center",
      width: 80,
      dataIndex: "Variations",
      render: (Picture, record, index) => {
        let attributes = record.attributes ? JSON.parse(record.attributes) : [];
        let ImageUrl = attributes?.find(
          (attr) => attr?.ImageUrl !== undefined
        )?.ImageUrl;
        ImageUrl = ImageUrl ? ImageUrl : MainPictureUrl;
        return <img src={ImageUrl} alt="product-view" />;
      },
    },
    {
      title: "Variations",
      width: 180,
      dataIndex: "attributes",
      render: (attributes, record) => {
        const attr_data = attributes ? JSON.parse(attributes) : [];
        const variationList = attr_data?.map((attribute, key) => (
          <p className="m-0" key={key}>
            {attribute?.PropertyName +
              ` : ` +
              (attribute?.ValueAlias || attribute?.Value)}
          </p>
        ));
        return (
          <>
            {variationList}
            <p className="m-0">
              {record.qty} x {record.price}
            </p>
          </>
        );
      },
    },
    {
      title: "Total",
      align: "center",
      width: 100,
      dataIndex: "subTotal",
      render: (subTotal) => {
        return subTotal ? subTotal : 0;
      },
    },
  ];

  const sourceLink = () => {
    let ItemId = walletItem.ItemId;
    let link = `https://item.taobao.com/item.htm?id=${ItemId}`;
    if (walletItem.ProviderType === "aliexpress") {
      link = `https://www.aliexpress.com/item/${ItemId}.html`;
    }
    return link;
  };

  const internalSourceLink = () => {
    return walletItem.ProviderType === "Taobao"
      ? `/product/${walletItem.ItemId}`
      : `/aliexpress/product/${walletItem.ItemId}`;
  };

  const otherInfoData = () => {
    let otherData = [];
    let includesData = [
      "item_number",
      "ItemId",
      "ProviderType",
      "ItemMainUrl",
      "MainPictureUrl",
      "regular_price",
      "weight",
      "actual_weight",
      "DeliveryCost",
      "Quantity",
      "shipped_by",
      "shipping_from",
      "shipping_type",
      "shipping_rate",
      "status",
      "source_order_number",
      "tracking_number",
      "product_value",
      "first_payment",
      "coupon_contribution",
      "bd_shipping_charge",
      "courier_bill",
      "out_of_stock",
      "lost_in_transit",
      "customer_tax",
      "missing",
      "adjustment",
      "refunded",
      "refunded_method",
      "last_payment",
      "due_payment",
      "invoice_no",
      "purchases_at",
      "comment1",
      "comment2",
      "created_at",
      "updated_at",
    ];
    for (let key in walletItem) {
      let value = walletItem[key];
      if (includesData.includes(key)) {
        otherData.push({
          key,
          value,
        });
      }
    }
    return otherData;
  };

  return (
    <>
      <Modal
        title={`Wallet Details #${walletItem.item_number}`}
        visible={show}
        onOk={() => setShow(false)}
        onCancel={() => setShow(false)}
        width={800}
      >
        <List
          size="small"
          dataSource={[
            <Title level={5}>{walletItem.Title}</Title>,
            <div>
              ChinaExpress Link :{" "}
              <a
                href={internalSourceLink()}
                rel="noreferrer nofollow"
                target="_blank"
              >
                Click Here
              </a>
            </div>,
            `Provider : ${walletItem.ProviderType}`,
            <div>
              Source Link :{" "}
              <a href={sourceLink()} rel="noreferrer nofollow" target="_blank">
                Click Here
              </a>
            </div>,
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
        <Divider orientation="left">Variations</Divider>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={variations}
          pagination={false}
          bordered
        />
        <Divider orientation="left">Others Information</Divider>
        <List
          size="small"
          dataSource={otherInfoData()}
          renderItem={(item) => (
            <List.Item style={{ textTransform: "capitalize" }}>
              <b>{item?.key}</b> : {item?.value}
            </List.Item>
          )}
        />
        <Divider orientation="left">Customer Info</Divider>
      </Modal>
    </>
  );
};

export default ViewDetails;
