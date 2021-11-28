import React, { BaseSyntheticEvent } from "react";
import { Responsive, Layout } from "react-grid-layout";

import "@root/../../node_modules/react-grid-layout/css/styles.css";
import "@root/../../node_modules/react-resizable/css/styles.css";
import "./GridLayout.scss";

// COMPONENTS
import { IGridBreakpoints } from "../interfaces/Interfaces";

const breakpoints: IGridBreakpoints = {
  lg: 2400,
  md: 1800,
  sm: 1100,
  xs: 700,
  xxs: 0,
};
const cols = { lg: 20, md: 16, sm: 12, xs: 8, xxs: 4 };

export interface LayoutProps {
  setMembers: any;
  TeamMembers: any[];
}

export const GridLayoutResizable = ({
  TeamMembers,
  setMembers,
}: LayoutProps): React.ReactElement => {
  //const [layout, setLayout] = useState(TeamMembers);
  const auxMembers: any[] = [];
  const handleLayoutChange = (layout: Layout[]) => {
    console.log(`layoutChanged`, layout);

    layout.sort((a: Layout, b: Layout) => {
      if (a.y > b.y) {
        return 1;
      }
      if (a.y < b.y) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    layout.map((item) => {
      return auxMembers.push({name: item.i});
    });
    setMembers(auxMembers);
  };

  const removeMember = (event: BaseSyntheticEvent) => {
    const target =
      event.target.parentNode.querySelector(".memberName").innerHTML;
    setMembers(
      TeamMembers.filter((memb) => {
        return memb.name !== target;
      })
    );
  };

  return (
    <Responsive
      isDraggable={true}
      isResizable={false}
      style={{ width: "450px", overflowY: "auto", minHeight: "10rem", maxHeight: "10rem"}}
      containerPadding={[0, 0]}
      breakpoints={breakpoints}
      cols={cols}
      rowHeight={6}
      margin={[10, 10]}
      onLayoutChange={handleLayoutChange}
      /*
       * This allows setting the initial width on the server side.
       * This is required unless using the HOC <WidthProvider> or similar.
       * 76 is the space occupied by the left & right margins.
       * 36 is the space occupied by the vertical right scrollBar.
       * 290 is the space occupied by the left panel when unfolded.
       */
      width={450}
      // Callback when the width changes, so you can modify the layout as needed.
      // Callback so you can save the layout.
      // Calls when resize starts.
    >
      {TeamMembers.map((member, index) => {
        // plugins
        return (
          <div
            className="layoutItem active"
            key={member.name}
            data-grid={{ x: 0, y: index, w: 3, h: 3 }}
          >
            <p className="memberName">{member.name}</p>
            <span className="removeMember" onClick={removeMember}>
              x
            </span>
          </div>
        );
      })}
    </Responsive>
  );
};
