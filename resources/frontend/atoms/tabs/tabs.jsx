import './tabs.css';
import TabItem from "#/atoms/tabs/item.jsx";


export default function Tabs({ tabs, selected, onTab }) {
  return (
    <div className="tabs">
      <TabItem title="Все" active={selected === null} onTab={ onTab } id={ null } key={ 'all' }/>
      {
        tabs.map((tab) => {
          return <TabItem key={ tab.id } title={tab.title} active={ tab.id === selected } id={ tab.id } onTab={ onTab }/>;
        })
      }
    </div>
  )
}
