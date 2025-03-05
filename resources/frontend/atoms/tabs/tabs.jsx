import './tabs.css';
import TabItem from "#/atoms/tabs/item.jsx";

export default function Tabs({ tabs, selected, onTab }) {
  const handleTabClick = (categoryId) => {
    onTab(categoryId === null ? null : Number(categoryId));
  };

  return (
    <div className="tabs">
      <TabItem
        title="Все"
        active={selected === null}
        onTab={() => handleTabClick(null)}
        key="all"
      />
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          title={tab.title}
          active={tab.id === selected}
          onTab={() => handleTabClick(tab.id)}
        />
      ))}
    </div>
  );
}
