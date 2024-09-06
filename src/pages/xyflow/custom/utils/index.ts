import { TABLE_BAR_NODE_TYPE } from "../table-bar-node";
import { TableBarComponent } from "../table-bar-node/TableBarComponent";
import { TABLE_HEADER_NODE_TYPE } from "../table-header-node";
import TableHeaderComponent from "../table-header-node/TableHeaderComponent";
import { TABLE_ROW_NODE_TYPE } from "../table-row-node";
import TableRowComponent from "../table-row-node/TableRowComponent";
import EventEmitter from "eventemitter3";

export const nodeTypes = {
  [TABLE_BAR_NODE_TYPE]: TableBarComponent,
  [TABLE_HEADER_NODE_TYPE]: TableHeaderComponent,
  [TABLE_ROW_NODE_TYPE]: TableRowComponent,
};

export const justifyContent = (align?: Align) => {
  if (align === "center") {
    return "center";
  }

  if (align === "left") {
    return "flex-start";
  }

  if (!align) {
    return "flex-start";
  }

  return "flex-end";
};

export const eventBus = new EventEmitter();
