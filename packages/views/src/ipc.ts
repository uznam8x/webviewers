const ipc = (window as any).ipc || { on: () => {}, removeListener: () => {} };
export default ipc;
