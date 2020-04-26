import React, { CSSProperties, FC, ReactElement, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import shallowEqual from './utils/shallowEqual';
import series from './utils/series';
import whilst from './utils/whilst';
import throttleFunc from './utils/throttle';
import uniqueId from './utils/uniqueId';
import { innerWidth, innerHeight } from './utils/innerSize';

const assertElementFitsWidth = (el: HTMLElement, width: number): boolean => {
  // -1: temporary bugfix, will be refactored soon
  return el.scrollWidth - 1 <= width;
};

const assertElementFitsHeight = (el: HTMLElement, height: number): boolean => {
  // -1: temporary bugfix, will be refactored soon
  return el.scrollHeight - 1 <= height;
};

function noop(): void {}

enum Mode {
  SINGLE = 'single',
  MULTI = 'multi',
}

interface ITextFitProps {
  autoResize: boolean;
  children: ReactElement;
  forceSingleModeWidth: boolean;
  min: number;
  max: number;
  mode: Mode;
  onReady: () => void;
  style?: Record<string, string>;
  text: string;
  throttle: number;
}

const TextFit: FC<ITextFitProps> = ({
  children,
  min = 1,
  max = 100,
  mode = 'multi',
  forceSingleModeWidth = true,
  style,
  text,
  throttle = 50,
  autoResize = true,
  onReady = noop,
}) => {
  const initialPid = uuid();

  const [fontSize, setFontSize] = useState();
  const [ready, setReady] = useState(false);
  const [pid, setPid] = useState(initialPid);

  const el = useRef<HTMLElement | null>(null);
  const wrapper = useRef(null);

  // const handleWindowResize = () => {
  //   const originalWidth = innerWidth(el);
  //   const originalHeight = innerHeight(el);

  //   if (originalHeight <= 0 || isNaN(originalHeight)) {
  //     console.warn(
  //       'Can not process element without height. Make sure the element is displayed and has a static height.'
  //     );
  //     return;
  //   }

  //   if (originalWidth <= 0 || isNaN(originalWidth)) {
  //     console.warn(
  //       'Can not process element without width. Make sure the element is displayed and has a static width.'
  //     );
  //     return;
  //   }

  //   const shouldCancelProcess = () => pid !== initialPid;

  //   const testPrimary =
  //     mode === 'multi'
  //       ? () => assertElementFitsHeight(wrapper, originalHeight)
  //       : () => assertElementFitsWidth(wrapper, originalWidth);

  //   const testSecondary =
  //     mode === 'multi'
  //       ? () => assertElementFitsWidth(wrapper, originalWidth)
  //       : () => assertElementFitsHeight(wrapper, originalHeight);

  //   let mid: number;
  //   let low = min;
  //   let high = max;

  //   setReady(false);

  //   series(
  //     [
  //       // Step 1:
  //       // Binary search to fit the element's height (multi line) / width (single line)
  //       stepCallback =>
  //         whilst(
  //           () => low <= high,
  //           whilstCallback => {
  //             if (shouldCancelProcess()) return whilstCallback(true);
  //             mid = parseInt((low + high) / 2, 10);

  //             setFontSize(mid);

  //             if (shouldCancelProcess()) return whilstCallback(true);
  //             if (testPrimary()) low = mid + 1;
  //             else high = mid - 1;
  //             return whilstCallback();
  //           },
  //           stepCallback
  //         ),
  //       // Step 2:
  //       // Binary search to fit the element's width (multi line) / height (single line)
  //       // If mode is single and forceSingleModeWidth is true, skip this step
  //       // in order to not fit the elements height and decrease the width
  //       stepCallback => {
  //         if (mode === 'single' && forceSingleModeWidth) return stepCallback();
  //         if (testSecondary()) return stepCallback();
  //         low = min;
  //         high = mid;
  //         return whilst(
  //           () => low < high,
  //           whilstCallback => {
  //             if (shouldCancelProcess()) return whilstCallback(true);
  //             mid = parseInt((low + high) / 2, 10);

  //             setFontSize(mid);

  //             if (pid !== this.pid) return whilstCallback(true);
  //             if (testSecondary()) low = mid + 1;
  //             else high = mid - 1;
  //             return whilstCallback();
  //           },
  //           stepCallback
  //         );
  //       },
  //       // Step 3
  //       // Limits
  //       stepCallback => {
  //         // We break the previous loop without updating mid for the final time,
  //         // so we do it here:
  //         mid = Math.min(low, high);

  //         // Ensure we hit the user-supplied limits
  //         mid = Math.max(mid, min);
  //         mid = Math.min(mid, max);

  //         // Sanity check:
  //         mid = Math.max(mid, 0);

  //         if (shouldCancelProcess()) return stepCallback(true);

  //         setFontSize(mid);
  //         stepCallback();
  //       },
  //     ],
  //     err => {
  //       // err will be true, if another process was triggered
  //       if (err || shouldCancelProcess()) return;
  //       setReady(true), () => onReady(mid);
  //     }
  //   );
  // };

  useEffect(() => {
    const handleWindowResize = (): void => {
      if (typeof el?.current !== null) {
        const originalWidth = innerWidth(el.current);
        const originalHeight = innerHeight(el.current);

        console.log(originalHeight, originalWidth);
      }
    };

    if (autoResize) {
      window.addEventListener('resize', handleWindowResize);
    }

    return (): void => {
      if (autoResize) {
        window.removeEventListener('resize', handleWindowResize);
      }

      // Setting a new pid will cancel all running processes
      setPid(uuid());
    };
  }, [autoResize]);

  // componentWillMount() {
  //   handleWindowResize = throttleFunc(handleWindowResize, throttle);
  // }

  // componentDidMount() {
  //   if (autoResize) {
  //     window.addEventListener('resize', handleWindowResize);
  //   }
  //   this.process();
  // }

  // componentDidUpdate(prevProps) {
  //   if (!ready) return;
  //   if (shallowEqual(this.props, prevProps)) return;
  //   this.process();
  // }

  const finalStyle = {
    ...style,
    fontSize,
  };

  const wrapperStyle: CSSProperties = {
    display: ready ? 'block' : 'inline-block',
    whiteSpace: mode === 'single' ? 'nowrap' : 'normal',
  };

  const hasText = text !== '';

  return (
    <div ref={el} style={finalStyle}>
      <div ref={wrapper} style={wrapperStyle}>
        {hasText && typeof children === 'function' ? (ready ? children(text) : text) : children}
      </div>
    </div>
  );
};

TextFit.displayName = 'TextFit';

export default TextFit;
