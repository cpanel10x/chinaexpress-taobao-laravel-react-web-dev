import { Table, Typography, Modal, Divider, List, Image } from "antd";
import React, { useEffect, useState } from "react";
import { slugToMakeTitle } from "../../../../../utils/Helpers";
import ImageLoader from "../../../../../loader/ImageLoader";

const { Title } = Typography;

const ViewDetails = ({ walletItem, show, setShow }) => {
  const [variations, setVariations] = useState([]);

  useEffect(() => {
    setVariations(walletItem?.item_variations);
  }, [walletItem]);

  const MainPictureUrl = walletItem.MainPictureUrl;

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
    let includesData = ['id', 'order_id', 'user_id', 'item_number', 'hasConfigurators', 'ItemId', 'shipped_by', 'shipping_from', 'status', 'purchases_at', 'created_at', 'updated_at', 'deleted_at', 'user', 'order', 'product', 'item_variations', 'tracking_exceptional'];
    for (let key in walletItem) {
      let value = walletItem?.[key];
      if (value && !includesData.includes(key)) {
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
        footer={false}
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
          rowKey={(record) => record.id}
          dataSource={variations}
          pagination={false}
          size="small"
          bordered
          columns={[
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
                let attributes = record.attributes
                  ? JSON.parse(record.attributes)
                  : [];
                let ImageUrl = attributes?.find(
                  (attr) => attr?.ImageUrl !== undefined
                )?.ImageUrl;

                return <ImageLoader path={ImageUrl ? ImageUrl : MainPictureUrl} />
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
          ]}
        />
        <Divider orientation="left">Others Information</Divider>
        <List
          size="small"
          dataSource={otherInfoData()}
          renderItem={(item) => (
            <List.Item style={{ textTransform: "capitalize" }}>
              <b>{slugToMakeTitle(item?.key)}</b> : {item?.value}
            </List.Item>
          )}
        />
        <Divider orientation="left">Customer Info</Divider>
      </Modal>
    </>
  );
};

export default ViewDetails;
