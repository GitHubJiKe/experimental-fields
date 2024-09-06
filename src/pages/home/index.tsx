import { Link } from "react-router-dom";
import { routeList } from "../../routes";
import { Menu, Icon } from "@ss/mtd-react";
import "./index.css";

const MenuItem = Menu.Item;
export default function Home() {
  return (
    <div>
      <Menu className="home" theme="dark">
        {routeList.map((route) => (
          <MenuItem key={route.path}>
            <Icon type={route.icon} />
            <Link to={route.path}>
              <label style={{ color: "white" }}>{route.name}</label>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
