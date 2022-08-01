import { Menu } from "antd";
import { useState } from "react";
import ViewDetails from "./ViewDetails";

const Action = ({ walletItem }) => {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState({});

  const viewWalletDetails = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <>
      <ViewDetails walletItem={walletItem} show={show} setShow={setShow} />
      <Menu
        items={[
          {
            key: "1",
            label: (
              <a href="/view-details" onClick={(e) => viewWalletDetails(e)}>
                View Details
              </a>
            ),
          },
          {
            key: "2",
            label: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.aliyun.com"
              >
                2nd menu item
              </a>
            ),
          },
        ]}
      />
    </>
  );
};

export default Action;
