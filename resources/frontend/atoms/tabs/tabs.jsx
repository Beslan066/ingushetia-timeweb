import './tabs.css';
import TabItem from "#/atoms/tabs/item.jsx";

export default function Tabs({ tabs, selected, onTab }) {
  return (
    <div className="tabs">
      <TabItem
        title="Все"
        active={selected === null}
        onTab={() => onTab(null)}
        key="all"
      />
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          title={tab.title}
          active={Number(tab.id) === Number(selected)}
          onTab={() => onTab(Number(tab.id))}
        />
      ))}
    </div>
  );
}
