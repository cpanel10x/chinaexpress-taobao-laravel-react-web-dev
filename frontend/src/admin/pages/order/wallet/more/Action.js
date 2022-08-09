import { Menu } from "antd";

const Action = ({ walletItem, handleActionClick }) => {
  return (
    <>
      <Menu
        items={[
          {
            key: "1",
            label: (
              <a
                href="/manage/order/wallet"
                onClick={(event) =>
                  handleActionClick(event, "view", walletItem)
                }
              >
                View Details
              </a>
            ),
          },
          {
            key: "2",
            label: (
              <a
                href="/manage/order/wallet"
                onClick={(event) =>
                  handleActionClick(event, "change-status", walletItem)
                }
              >
                Change status
              </a>
            ),
          },
          {
            key: "3",
            label: (
              <a
                href="/manage/order/wallet"
                onClick={(event) =>
                  handleActionClick(event, "tracking", walletItem)
                }
              >
                Tracking Info
              </a>
            ),
          },
          {
            key: "4",
            label: (
              <a
                href="/manage/order/wallet"
                onClick={(event) =>
                  handleActionClick(event, "master_edit", walletItem)
                }
              >
                Master Edit
              </a>
            ),
          },
        ]}
      />
    </>
  );
};

export default Action;
