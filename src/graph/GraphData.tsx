import { FC } from "react";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";

import { graphDataToFlow } from "./graphUtils";
import graphSlice from "../store/graphSlice";
import viewSlice from "../store/viewSlice";

const GraphData: FC = () => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: { data: "[[1,2],[1,4],[2,3],[4,5]]" },
  });

  const onSubmit = () => {
    const { data } = form.getValues();
    try {
      const jsData = JSON.parse(data) as Array<Array<number>>;
      if (Array.isArray(jsData)) {
        const { nodes, edges } = graphDataToFlow(jsData);
        dispatch(graphSlice.actions.setNodes(nodes));
        dispatch(graphSlice.actions.setEdges(edges));
        dispatch(graphSlice.actions.setRootNode(nodes[0]?.id));
        dispatch(viewSlice.actions.setActiveTab(1));
      } else {
        throw new Error();
      }
    } catch {
      form.setError("data", { message: "Invalid" });
    }
  };

  return (
    <form
      className="flex flex-column gap-3"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="text-color-secondary">
        <code>
          Input accepts a 2D array of edges between vertices. So,
          [[1,2],[1,4],[2,3],[4,5]] draws a Graph with 5 Vertices and 3 Edges.
        </code>
      </div>
      <Controller
        name="data"
        control={form.control}
        render={({ field, fieldState }) => (
          <InputTextarea
            {...field}
            id={field.name}
            style={{ width: "75vw" }}
            className={classNames({ "p-invalid": fieldState.error })}
          />
        )}
      />
      <div>
        <Button type="submit" label="Apply" size="small" />
      </div>
    </form>
  );
};

export default GraphData;
