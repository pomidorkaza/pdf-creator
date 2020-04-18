import { INCREMENT, DECREASE } from "../actionType";

export function incrementAction() {
    return {
      type: INCREMENT,
    };
  }
export function decreaseAction() {
  return{
    type: DECREASE,
  };
}

