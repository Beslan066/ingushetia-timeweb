import React, { useRef, useState, useEffect } from "react";
import TabItem from "#/atoms/tabs/item.jsx";
import "./tabs.css";

export default function Tabs({ tabs, selected, onTab }) {
  const tabsRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setCanScroll({
        left: scrollLeft > 0,
        right: scrollLeft + clientWidth < scrollWidth,
      });
    }
  };

  useEffect(() => {
    checkScroll();
    const currentRef = tabsRef.current;
    currentRef?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      currentRef?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = tabsRef.current.clientWidth * 0.8;
      tabsRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="tabs-container">
      <button
        className={`scroll-button left ${!canScroll.left ? "hidden" : ""}`}
        onClick={() => handleScroll("left")}
      >
        <img src={'/img/icons/slidenextblack.svg'} alt="Previous" />
      </button>

      <div className="tabs" ref={tabsRef}>
        <TabItem
          title="Все"
          active={selected === null}
          onTab={onTab}
          id={null}
          key="all"
        />
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            title={tab.title}
            active={String(tab.id) === String(selected)}
            id={tab.id}
            onTab={onTab}
          />
        ))}
      </div>

      <button
        className={`scroll-button right ${!canScroll.right ? "hidden" : ""}`}
        onClick={() => handleScroll("right")}
      >
        <img src={'/img/icons/slidenextblack.svg'} alt="Next" />
      </button>
    </div>
  );
}
