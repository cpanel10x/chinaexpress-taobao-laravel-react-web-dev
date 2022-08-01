import { Menu } from "antd";
import { useState } from "react";

export const ActionOptions = (options) => {
  const [item, setItem] = useState({});

  const ActionMemuClick = ({ item, key, keyPath, domEvent }) => {
    console.log("item", item);
    console.log("key", key);
  };

  return (
    <Menu
      onClick={ActionMemuClick}
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
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
  );
};
