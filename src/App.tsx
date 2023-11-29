import { useDispatch, useSelector } from "react-redux";
import { Toolbar } from "primereact/toolbar";
import { TabView, TabPanel } from "primereact/tabview";

import GraphData from "./graph/GraphData";
import GraphFlow from "./graph/GraphFlow";
import viewSlice from "./store/viewSlice";

const externalLinks = [
  {
    label: "View on GitHub",
    href: "https://github.com/harbirchahal/react-flow-graph-traversal-demo",
  },
  {
    label: "Edit on StackBlitz",
    href: "https://stackblitz.com/edit/react-flow-graph-traversal-demo",
  },
];

function App() {
  const dispatch = useDispatch();
  const activeTab = useSelector(viewSlice.select.getActiveTab);

  return (
    <>
      <Toolbar
        start={<div className="font-bold">React Flow Graph Traversal Demo</div>}
        end={
          <div className="flex gap-1">
            {externalLinks.map((link) => (
              <a
                href={link.href}
                target="_blank"
                className="p-button p-button-secondary p-button-outlined p-button-sm px-2 no-underline"
                style={{ height: "30px" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        }
      />
      <TabView
        activeIndex={activeTab}
        onTabChange={(e) => dispatch(viewSlice.actions.setActiveTab(e.index))}
      >
        <TabPanel header="Data">
          <GraphData />
        </TabPanel>
        <TabPanel header="Graph">
          <GraphFlow />
        </TabPanel>
      </TabView>
    </>
  );
}

export default App;
