import React, { useContext, useEffect, useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";

import "@root/../../node_modules/react-grid-layout/css/styles.css";
import "@root/../../node_modules/react-resizable/css/styles.css";
import "./GridLayout.scss";

// COMPONENTS
import { WebViewer } from "../GridContentItems";
import { IGridBreakpoints } from "../interfaces/Interfaces";
import { useWindowSize } from "./WidthProviderOwn";
import { BottomRightHandle } from "./CustomResizeHandle";
import { TopRightHandle } from "./CustomRemoveHandle";

const ResponsiveGridLayout = WidthProvider(Responsive);

const breakpoints: IGridBreakpoints = {
  lg: 2400,
  md: 1800,
  sm: 1100,
  xs: 700,
  xxs: 0,
};
const cols = { lg: 20, md: 16, sm: 12, xs: 8, xxs: 4 };

export interface LayoutProps {
  removeMember: () => void;
  Layout?: Layout[] | undefined;
}

export const GridLayoutResizable = ({
  Layout,
  removeMember,
}: LayoutProps): React.ReactElement => {
  const [items, setItems] = useState(Layout);
  //const items = Layout

  const [resizeArrow, setResizeArrow] = useState("initial");
  const [layoutService, setLayoutService] = useState({});
  const [width, height] = useWindowSize();
;

  useEffect(() => {
    Layout && setLayoutService(Layout);
  }),
    [Layout];

  const handleLayoutChange = (layout: Layout[]) => {
    console.log(`layoutChanged`, layout)




  



  return items ? (
    <Responsive
      isDraggable={true}
      isResizable={false}
      className="responsiveContainer"
      containerPadding={[0, 0]}
      layouts={{ lg: items, md: items, sm: items }}
      breakpoints={breakpoints}
      cols={cols}
      resizeHandles={["se"]}
      rowHeight={40}
      margin={[24, 24]}
      /*
       * This allows setting the initial width on the server side.
       * This is required unless using the HOC <WidthProvider> or similar.
       * 76 is the space occupied by the left & right margins.
       * 36 is the space occupied by the vertical right scrollBar.
       * 290 is the space occupied by the left panel when unfolded.
       */
      width={ width }
      // Callback when the width changes, so you can modify the layout as needed.
      // Callback so you can save the layout.
      // Calls when resize starts.
      
    >
      {items.map((item, index) => {
        const component = components && components.find((w) => w.id === item.i);
        const ar = item.w / item.h;
        const mode = ar > 0.6 ? "landscape" : ar < 0.45 ? "portrait" : "square";
        // plugins
        return (
          <div
            key={item.i}
            data-grid={{ x: item.x, y: item.y, w: item.w, h: item.h }}
          >
            <WebViewer
              component={component}
              zIndex={isEdit || isPreview ? "-1" : "1"}
              componentAspectRatio={mode}
            />
            {isEdit ? <BottomRightHandle displayArrow={resizeArrow} /> : ""}
            {isEdit ? (
              <TopRightHandle index={index} handleClick={removeWidgetHandler} />
            ) : (
              ""
            )}
          </div>
        );
      })}
    </Responsive>
  ) : (
    <div> test </div>
  );
};
