export const Channel = Object.freeze({
  READY: 'ready',
});
export default (channel: string, data: any = {}) => {
  window.dispatchEvent(
    new CustomEvent(channel, {
      detail: data,
    })
  );
};
