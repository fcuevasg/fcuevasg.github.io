import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";

export interface gridProps {}

export const TeamGrid = (props: gridProps): React.ReactElement => {
  // layout is an array of objects, see the demo for more complete usage
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];
  const ResponsiveGridLayout = WidthProvider(Responsive);

  return (
    <ResponsiveGridLayout className="layout" layouts={layout}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        <div key="1">1</div>
        <div key="2">2</div>
        <div key="3">3</div>
      </ResponsiveGridLayout>
  );
};
