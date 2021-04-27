import { createContext } from "react";

type ContextType = {
  browser: any;
  isDesktop: boolean;
  toggleDesktop: () => void;
};

export default createContext<ContextType>({
  browser: {},
  isDesktop: false,
  toggleDesktop: () => {},
});
