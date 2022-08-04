import {Menu} from "antd";
import {useState} from "react";
import ViewDetails from "./ViewDetails";
import ChangeStatus from "./ChangeStatus";

const Action = ({walletItem}) => {
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const viewWalletDetails = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const changeStatus = (e) => {
    e.preventDefault();
    setShowStatus(true);
  };

  return (
    <>
      <ViewDetails walletItem={walletItem} show={show} setShow={setShow}/>
      <ChangeStatus walletItem={walletItem} show={showStatus} setShow={setShowStatus}/>
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
                href="/change-status"
                onClick={(e) => changeStatus(e)}
              >
                Change status
              </a>
            ),
          },
        ]}
      />
    </>
  );
};

export default Action;
