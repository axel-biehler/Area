import React from "react";
import { Typography } from "@material-ui/core";
import { IListParamsProps, IParameter } from "../../Interfaces";
import DynamicBoolean from "./DynamicParameters/DynamicBoolean";
import DynamicString from "./DynamicParameters/DynamicString";

function ListParams(props: IListParamsProps) {
  return (
    <div>
      <Typography variant="body1" style={{ textAlign: "center" }}>Event parameters</Typography>
      {props.event.parameters.map((element: IParameter, index: number) => {
        if (element.type === "boolean") {
          return (
            <DynamicBoolean
              key={index}
              index={index}
              element={element}
              editParams={props.editParams}
            />
          );
        } else if (element.type === "string") {
          return (
            <DynamicString
              key={index}
              index={index}
              element={element}
              editParams={props.editParams}
            />
          );
        }
        return (
          <DynamicBoolean
            key={index}
            index={index}
            element={element}
            editParams={props.editParams}
          />
        );
      })}
    </div>
  );
}

export default ListParams;
