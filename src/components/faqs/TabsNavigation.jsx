export default function TabsNavigation({ tabs, activeTab, setActiveTab, setActiveAccordion }) {
  return (
    <div className="tabs-navigation">
      <div className="tabs-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab.id);
              setActiveAccordion(null);
            }}
          >
            <i className={`fa-solid ${tab.icon}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
