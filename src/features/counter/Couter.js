import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementBy, decrementBy, CounterState } from "./counterSlice";

export function Counter() {
  const dispatch = useDispatch();
  const counterState = useSelector(CounterState);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            dispatch(incrementBy(1));
          }}
        >
          +
        </button>
        <span>{counterState.value}</span>
        <button
          onClick={() => {
            dispatch(decrementBy(1));
          }}
        >
          -
        </button>
        <span>{counterState.testObj.b && counterState.testObj.b.c}</span>
        <span>{counterState.testObj && counterState.testObj.d}</span>

        <span>{counterState.isBad ? "good" : "bad"}</span>
      </div>
    </div>
  );
}
