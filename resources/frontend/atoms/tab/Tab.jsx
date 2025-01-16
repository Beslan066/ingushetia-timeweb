import React, { useState } from "react";
import './tab.css'

const getTabs = (children) => {
  const array = Array.isArray(children) ? children : [children];
  return array.map((child) => child.props.name);
}

const getPanes = (children) => {
  return Array.isArray(children) ? children : [children]
}

export default function Tab({ children }) {
  const tabs = getTabs(children);
  const panes = getPanes(children);
  const [active, setActive] = useState(tabs[0])

  return (
    <div className="horizontal-tabs">
      <div className="tabs__header">
        {
          tabs && tabs.map((tab) => <button key={ tab } className={ `tab tab--${active === tab ? 'active' : 'inactive'}` } onClick={ () => setActive(tab) }>{ tab }</button>)
        }
      </div>
      <div className="tab__panes">
        { panes.map((pane) => {
          if (pane.props.name !== active) {
            return null;
          }

          return pane;
        }) }
      </div>
    </div>
  )
}
