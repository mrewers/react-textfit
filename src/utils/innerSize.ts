// Calculate height without padding.
export const innerHeight = (el: HTMLElement): number => {
  const style = window.getComputedStyle(el, null);

  return (
    el.clientHeight -
    parseInt(style.getPropertyValue('padding-top'), 10) -
    parseInt(style.getPropertyValue('padding-bottom'), 10)
  );
};

// Calculate width without padding.
export const innerWidth = (el: HTMLElement): number => {
  const style = window.getComputedStyle(el, null);

  return (
    el.clientWidth -
    parseInt(style.getPropertyValue('padding-left'), 10) -
    parseInt(style.getPropertyValue('padding-right'), 10)
  );
};
