import { useDispatch, useSelector } from "react-redux";
import { Toolbar } from "primereact/toolbar";
import { TabView, TabPanel } from "primereact/tabview";

import GraphData from "./graph/GraphData";
import GraphFlow from "./graph/GraphFlow";
import viewSlice from "./store/viewSlice";

function App() {
  const dispatch = useDispatch();
  const activeTab = useSelector(viewSlice.select.getActiveTab);

  return (
    <>
      <Toolbar start="React Flow Graph Traversal Demo" className="font-bold" />
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
