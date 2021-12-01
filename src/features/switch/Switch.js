import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, SwitchState } from "./switchSlice";

export function Switch() {
  const dispatch = useDispatch();
  const switchState = useSelector(SwitchState);
  console.log(switchState.isOpen);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            console.log(111);
            dispatch(toggle());
          }}
        >
          切换
        </button>
        <span>{switchState.isOpen ? "开" : "关"}</span>
      </div>
    </div>
  );
}
