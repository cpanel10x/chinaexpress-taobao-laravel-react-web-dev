import { Timeline } from "antd";
import moment from "moment";

const TrackingItem = ({ item }) => {
  const exceptions = item?.exceptions || [];

  if (exceptions?.length > 0) {
    return (
      <>
        {exceptions.map((exception, index) => (
          <Timeline.Item
            color={exception.updated_time ? "green" : "gray"}
            index="index"
          >
            {exception.tracking_status} <br />
            {exception.updated_time
              ? moment(exception.updated_time).format("DD-MM-YYYY hh:mm a")
              : ""}
          </Timeline.Item>
        ))}
      </>
    );
  }

  return (
    <>
      <Timeline.Item color={item.updated_time ? "green" : "gray"}>
        {item.tracking_status} <br />
        {item.updated_time
          ? moment(item.updated_time).format("DD-MM-YYYY hh:mm a")
          : ""}
      </Timeline.Item>
    </>
  );
};

export default TrackingItem;
