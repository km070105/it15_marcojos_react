import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Mock data for our aesthetic cards
  const stats = [
    { id: 1, title: "Total Revenue", value: "$45,231", icon: "💰", trend: "+12%" },
    { id: 2, title: "Active Users", value: "2,405", icon: "👥", trend: "+5%" },
    { id: 3, title: "Sales", value: "540", icon: "📈", trend: "+18%" },
    { id: 4, title: "Pending Orders", value: "12", icon: "⏳", trend: "-2%" },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="logo">CORE.UI</div>
        <nav className="nav-menu">
          <button className="nav-item active">🏠 Overview</button>
          <button className="nav-item">📊 Analytics</button>
          <button className="nav-item">📂 Projects</button>
          <button className="nav-item">⚙️ Settings</button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        <header className="main-header">
          <h1>System Overview</h1>
          <div className="user-profile">
            <span>Welcome, Admin</span>
            <div className="avatar">A</div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((item) => (
            <div key={item.id} className="stat-card">
              <div className="card-header">
                <span className="icon">{item.icon}</span>
                <span className={`trend ${item.trend.includes('+') ? 'up' : 'down'}`}>
                  {item.trend}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p className="value">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">New user registered: marc_99</div>
            <div className="activity-item">Server update completed</div>
            <div className="activity-item">Payment received from Client #402</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;