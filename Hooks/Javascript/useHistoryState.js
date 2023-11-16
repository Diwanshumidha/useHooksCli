import { useState, useRef, useEffect } from "react";

const useHistoryState = (initialState) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(initialState);
    historyRef.current = { states: [initialState], pointer: 0 };
  }, [initialState]);

  const historyRef = useRef({ states: [initialState], pointer: 0 });

  const set = (newState) => {
    const { states, pointer } = historyRef.current;

    // If the incoming state is the same as the current state, do nothing
    if (newState === state) {
      return;
    }

    // If not at the latest state, truncate the history
    const newStates = states.slice(0, pointer + 1);

    historyRef.current = {
      states: [...newStates, newState],
      pointer: pointer + 1,
    };

    setState(newState);
  };

  const undo = () => {
    const { pointer, states } = historyRef.current;
    if (pointer > 0) {
      const previousState = states[pointer - 1];
      setState(previousState);
      historyRef.current = {
        states,
        pointer: pointer - 1,
      };
    } else {
      console.error("Cannot undo. No more past states.");
    }
  };

  const redo = () => {
    const { pointer, states } = historyRef.current;
    if (pointer < states.length - 1) {
      const nextState = states[pointer + 1];
      setState(nextState);
      historyRef.current = {
        states,
        pointer: pointer + 1,
      };
    } else {
      console.error("Cannot redo. No more future states.");
    }
  };

  const clear = () => {
    setState(initialState);
    historyRef.current = {
      states: [initialState],
      pointer: 0,
    };
  };

  const canUndo = historyRef.current.pointer > 0;
  const canRedo =
    historyRef.current.pointer < historyRef.current.states.length - 1;

  return {
    state,
    set,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
    history: historyRef.current,
  };
};

export default useHistoryState;
