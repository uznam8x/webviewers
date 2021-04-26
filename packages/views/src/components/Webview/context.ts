import { createContext } from "react";

const initalize = {
  status: {
      location: '',
  },
  canBackward: () => false,
  canForward: () => false,
  backward: () => {},
  forward: () => {},
  push: (url: string) => {},
  
};

export default createContext(initalize);
