import { createContext } from "react";

type ContextType = {
  id: string;
  viewer: any;
  setStatus: (state: any) => void;
  setViewer: (viewer: any) => void;
  goBackard: () => void;
  goForward: () => void;
  reload: () => void;
  [key: string]: any;
};

export default createContext<ContextType>({
  id: "",
  viewer: {},
  location: "",
  isLoading: false,
  isFullscreen: false,
  canGoBackward: false,
  canGoForward: false,
  setStatus: () => {},
  setViewer: (item: any) => {},
  goBackard: () => {},
  goForward: () => {},
  reload: () => {},
});
