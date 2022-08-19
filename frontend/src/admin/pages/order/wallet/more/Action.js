import { Button, Menu } from "antd";

const Action = ({ walletItem, handleActionClick, isLoading }) => {

  const { status } = walletItem;

  const btnClick = (event, option) => {
    handleActionClick(event, option, walletItem)
  }

  const disabledIf = ['refunded', 'delivered'];


  return (
    <>
      <Menu
        items={[
          {
            key: "1",
            label: (
              <Button type="text" onClick={e => btnClick(e, "view")} size="small" loading={isLoading}>
                View Details
              </Button>
            ),
          },
          {
            key: "2",
            label: (
              <Button type="text"
                onClick={e => btnClick(e, "change-status")}
                size="small"
                disabled={disabledIf.includes(status)}
                loading={isLoading}>
                Change status
              </Button>
            ),
          },
          {
            key: "3",
            label: (
              <Button type="text" onClick={e => btnClick(e, "tracking")} size="small" loading={isLoading}>
                Tracking Info
              </Button>
            ),
          },
          {
            key: "4",
            label: (
              <Button type="text" onClick={e => btnClick(e, "master_edit")} size="small" loading={isLoading}>
                Master Edit
              </Button>
            ),
          },
        ]}
      />
    </>
  );
};

export default Action;
