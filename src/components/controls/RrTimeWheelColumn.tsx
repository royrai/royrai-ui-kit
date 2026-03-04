import { useRef, useEffect, useCallback, useMemo, useState } from "react";

export interface RrTimeWheelColumnProps {
  maxValue: number;
  value: number;
  onChange: (value: number) => void;
  primaryColor: string;
  highlightBackground: string;
  fadeColor: string;
}

const ITEM_HEIGHT = 44;
const COLUMN_HEIGHT = 150;
const FADE_HEIGHT = 50;
const SPACER_HEIGHT = 53;

/** Unique class name for scrollbar hiding — internal to this component */
const SCROLL_CLASS = "rr-wheel-scroll";

export function RrTimeWheelColumn({
  maxValue,
  value,
  onChange,
  primaryColor,
  highlightBackground,
  fadeColor,
}: RrTimeWheelColumnProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const isUserScrolling = useRef(false);
  const [centerIndex, setCenterIndex] = useState(0);

  const items = useMemo(
    () => Array.from({ length: maxValue }, (_unused, idx) => idx),
    [maxValue]
  );

  const snapToItem = useCallback(() => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }
    const index = Math.round(container.scrollTop / ITEM_HEIGHT);
    container.scrollTo({ top: index * ITEM_HEIGHT, behavior: "smooth" });
    setCenterIndex(index);
    onChange(index);
    isUserScrolling.current = false;
  }, [onChange]);

  const handleScroll = useCallback(() => {
    isUserScrolling.current = true;
    if (scrollTimeoutRef.current !== null) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const container = scrollRef.current;
    if (container) {
      setCenterIndex(Math.round(container.scrollTop / ITEM_HEIGHT));
    }

    scrollTimeoutRef.current = window.setTimeout(snapToItem, 80);
  }, [snapToItem]);

  // Set initial scroll position
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = value * ITEM_HEIGHT;
      setCenterIndex(value);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset scroll when value changes externally (e.g. timer reset)
  useEffect(() => {
    if (!isUserScrolling.current && scrollRef.current) {
      scrollRef.current.scrollTop = value * ITEM_HEIGHT;
      setCenterIndex(value);
    }
  }, [value]);

  return (
    <>
      <style>{`
        .${SCROLL_CLASS} { scrollbar-width: none; -ms-overflow-style: none; }
        .${SCROLL_CLASS}::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{ position: "relative", height: COLUMN_HEIGHT, width: 60, overflow: "hidden" }}>
        {/* Fade gradient — top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: FADE_HEIGHT,
            pointerEvents: "none",
            zIndex: 10,
            background: `linear-gradient(to bottom, ${fadeColor}, transparent)`,
          }}
        />
        {/* Fade gradient — bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: FADE_HEIGHT,
            pointerEvents: "none",
            zIndex: 10,
            background: `linear-gradient(to top, ${fadeColor}, transparent)`,
          }}
        />
        {/* Center highlight band */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: ITEM_HEIGHT,
            transform: "translateY(-50%)",
            backgroundColor: highlightBackground,
            borderRadius: 8,
            borderTop: `2px solid ${primaryColor}`,
            borderBottom: `2px solid ${primaryColor}`,
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* Scrollable number column */}
        <div
          ref={scrollRef}
          className={SCROLL_CLASS}
          style={{
            height: "100%",
            overflowY: "scroll",
            scrollSnapType: "y mandatory",
          }}
          onScroll={handleScroll}
        >
          <div style={{ height: SPACER_HEIGHT }} />

          {items.map((item) => (
            <div
              key={item}
              style={{
                height: ITEM_HEIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.8rem",
                fontWeight: 600,
                color: primaryColor,
                fontFamily: "'Courier New', Courier, monospace",
                transition: "all 150ms",
                scrollSnapAlign: "center",
                opacity: item === centerIndex ? 1 : 0.4,
                transform: item === centerIndex ? "scale(1.1)" : "scale(1)",
              }}
            >
              {item.toString().padStart(2, "0")}
            </div>
          ))}

          <div style={{ height: SPACER_HEIGHT }} />
        </div>
      </div>
    </>
  );
}
