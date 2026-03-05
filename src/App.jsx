import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #eef2f7; }

  .layout { display: flex; height: 100vh; overflow: hidden; }

  .sidebar {
    width: 175px; min-width: 175px;
    background: linear-gradient(180deg, #1a0f08 0%, #2d1a0e 50%, #1a0f08 100%);
    display: flex; flex-direction: column;
    box-shadow: 4px 0 24px rgba(0,0,0,0.28);
    position: relative; z-index: 10;
  }

  .sidebar-logo {
    padding: 22px 18px 18px;
    display: flex; align-items: center; gap: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 10px;
  }
  .logo-icon {
    width: 30px; height: 30px; background: #E85D04; border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 14px; color: white; flex-shrink: 0;
  }
  .logo-name { color: white; font-size: 14px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; font-size: 16px; }

  .nav-list { flex: 1; padding: 4px 10px; }
  .nav-item {
    display: flex; align-items: center; gap: 9px;
    padding: 10px 12px; border-radius: 7px; cursor: pointer;
    color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 500;
    transition: all 0.18s; margin-bottom: 2px; user-select: none;
  }
  .nav-item:hover { color: rgba(255,255,255,0.88); background: rgba(255,255,255,0.07); }
  .nav-item.active {
    background: rgba(232,93,4,0.25); color: white; font-weight: 600;
    box-shadow: inset 3px 0 0 #E85D04;
  }

  .sidebar-bottom { padding: 14px 10px 22px; }
  .logout-btn {
    width: 100%; background: #c0392b; color: white; border: none;
    border-radius: 8px; padding: 11px; font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 600; cursor: pointer;
    transition: background 0.18s, transform 0.12s;
  }
  .logout-btn:hover { background: #a93226; transform: scale(1.01); }

  .main { flex: 1; overflow-y: auto; background: #eef2f7; }

  .topbar {
    background: white; padding: 14px 28px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid #e2e8f0;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05);
    position: sticky; top: 0; z-index: 5;
  }
  .topbar-title { font-size: 16px; font-weight: 700; color: #1e293b; }
  .topbar-date  { font-size: 11px; color: #94a3b8; margin-top: 1px; }
  .avatar {
    width: 34px; height: 34px;
    background: linear-gradient(135deg, #E85D04, #c74e03);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    color: white; font-weight: 700; font-size: 13px; cursor: pointer;
  }

  .content { padding: 26px 28px; }

  .stats-row {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 18px; margin-bottom: 22px;
  }
  .stat-card {
    background: white; border-radius: 12px; padding: 20px 24px;
    box-shadow: 0 1px 8px rgba(0,0,0,0.06); position: relative; overflow: hidden;
    transition: transform 0.18s, box-shadow 0.18s;
  }
  .stat-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.10); }
  .stat-label { font-size: 11px; color: #94a3b8; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.06em; }
  .stat-value { font-size: 30px; font-weight: 800; color: #0f172a; letter-spacing: -1px; line-height: 1; margin-bottom: 10px; }
  .stat-change {
    font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 3px;
    padding: 3px 8px; border-radius: 20px;
  }
  .stat-change.up   { color: #16a34a; background: #f0fdf4; }
  .stat-change.down { color: #dc2626; background: #fef2f2; }
  .stat-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; border-radius: 0 0 12px 12px; }

  .section-card {
    background: white; border-radius: 12px;
    box-shadow: 0 1px 8px rgba(0,0,0,0.06); overflow: hidden; margin-bottom: 20px;
  }
  .section-header {
    padding: 16px 24px; border-bottom: 1px solid #f1f5f9;
    display: flex; justify-content: space-between; align-items: center;
  }
  .section-title { font-size: 13px; font-weight: 700; color: #1e293b; }
  .section-action { font-size: 12px; color: #E85D04; font-weight: 600; background: none; border: none; cursor: pointer; font-family: 'Inter', sans-serif; }

  .inv-table { width: 100%; border-collapse: collapse; }
  .inv-table th {
    text-align: left; padding: 10px 24px; font-size: 10px; font-weight: 700;
    color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em;
    background: #f8fafc; border-bottom: 1px solid #f1f5f9;
  }
  .inv-table td { padding: 13px 24px; font-size: 13px; color: #334155; border-bottom: 1px solid #f8fafc; }
  .inv-table tr:last-child td { border-bottom: none; }
  .inv-table tbody tr:hover td { background: #f8fafc; }

  .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
  .badge-paid    { background: #f0fdf4; color: #16a34a; }
  .badge-pending { background: #fffbeb; color: #d97706; }
  .badge-failed  { background: #fef2f2; color: #dc2626; }

  .page-header { margin-bottom: 22px; }
  .page-title { font-size: 21px; font-weight: 800; color: #0f172a; }
  .page-sub   { font-size: 12px; color: #94a3b8; margin-top: 3px; }

  .bar-chart-wrap { padding: 20px 24px; }
  .bar-chart-title { font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 14px; }
  .bars { display: flex; align-items: flex-end; gap: 7px; height: 110px; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; }
  .bar-fill { width: 100%; border-radius: 4px 4px 0 0; transition: height 0.5s cubic-bezier(.16,1,.3,1); }
  .bar-label { font-size: 10px; color: #94a3b8; font-weight: 500; }

  .add-btn {
    background: #2d1a0e; color: white; border: none; border-radius: 8px;
    padding: 8px 16px; font-family: 'Inter', sans-serif;
    font-size: 12px; font-weight: 600; cursor: pointer; transition: background 0.18s;
  }
  .add-btn:hover { background: #E85D04; }

  .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .settings-section { background: white; border-radius: 12px; padding: 22px; box-shadow: 0 1px 8px rgba(0,0,0,0.06); }
  .settings-section-title { font-size: 13px; font-weight: 700; color: #1e293b; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9; }
  .setting-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid #f8fafc; }
  .setting-row:last-of-type { border-bottom: none; }
  .setting-label { font-size: 12px; color: #334155; font-weight: 500; }
  .setting-value { font-size: 12px; color: #64748b; }
  .toggle { width: 36px; height: 19px; border-radius: 10px; border: none; cursor: pointer; position: relative; transition: background 0.2s; }
  .toggle::after { content: ''; position: absolute; top: 3px; width: 13px; height: 13px; border-radius: 50%; background: white; transition: left 0.2s; }
  .toggle.on { background: #E85D04; }
  .toggle.on::after { left: 20px; }
  .toggle.off { background: #cbd5e1; }
  .toggle.off::after { left: 3px; }
  .save-btn {
    background: #E85D04; color: white; border: none; border-radius: 8px;
    padding: 9px 20px; font-family: 'Inter', sans-serif;
    font-size: 12px; font-weight: 600; cursor: pointer; margin-top: 16px;
    transition: background 0.18s;
  }
  .save-btn:hover { background: #c74e03; }
`;

// ── Icons ─────────────────────────────────────────────────────────────────────
const Ico = {
  overview:  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
  analytics: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  customers: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  settings:  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
};

// ── Overview ──────────────────────────────────────────────────────────────────
// ── Shared customer data (used across Overview & Customers pages) ─────────────
const CUSTOMERS = [
  { id:"C001", name:"Maria Santos",  email:"maria@email.com",   avatar:"M", color:"#E85D04" },
  { id:"C002", name:"James Reyes",   email:"james@email.com",   avatar:"J", color:"#6366f1" },
  { id:"C003", name:"Ana Cruz",      email:"ana@email.com",     avatar:"A", color:"#22c55e" },
  { id:"C004", name:"Paolo Lim",     email:"paolo@email.com",   avatar:"P", color:"#f59e0b" },
  { id:"C005", name:"Carla Diaz",    email:"carla@email.com",   avatar:"C", color:"#06b6d4" },
];

const OverviewPage = () => {
  const orders = [
    { id:"ORD #3041", custId:"C001", item:"🍔 Classic Burger x2",  amount:"$17.98", date:"Mar 6, 2026", status:"paid"    },
    { id:"ORD #3042", custId:"C002", item:"🍕 Pepperoni Pizza x1", amount:"$11.50", date:"Mar 6, 2026", status:"pending" },
    { id:"ORD #3043", custId:"C003", item:"🍣 Salmon Roll x3",     amount:"$39.00", date:"Mar 6, 2026", status:"failed"  },
    { id:"ORD #3044", custId:"C004", item:"🥤 Mango Smoothie x2",  amount:"$9.00",  date:"Mar 6, 2026", status:"paid"    },
    { id:"ORD #3045", custId:"C005", item:"🍩 Cheese Donut x4",    amount:"$13.00", date:"Mar 6, 2026", status:"pending" },
  ];
  const getCustomer = (id) => CUSTOMERS.find(c => c.id === id);
  return (
    <div>
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Today's Revenue</div>
          <div className="stat-value">$1,284</div>
          <span className="stat-change up">▲ +12.3%</span>
          <div className="stat-bar" style={{background:"linear-gradient(90deg,#E85D04,#f59e0b)"}}/>
        </div>
        <div className="stat-card">
          <div className="stat-label">Orders Today</div>
          <div className="stat-value">88</div>
          <span className="stat-change up">▲ +8.5%</span>
          <div className="stat-bar" style={{background:"linear-gradient(90deg,#22c55e,#16a34a)"}}/>
        </div>
        <div className="stat-card">
          <div className="stat-label">New Customers</div>
          <div className="stat-value">24</div>
          <span className="stat-change up">▲ +2.1%</span>
          <div className="stat-bar" style={{background:"linear-gradient(90deg,#f59e0b,#ef4444)"}}/>
        </div>
      </div>
      <div className="section-card">
        <div className="section-header">
          <span className="section-title">Recent Orders</span>
          <button className="section-action">View all →</button>
        </div>
        <table className="inv-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Item</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord,i) => {
              const cust = getCustomer(ord.custId);
              return (
                <tr key={i}>
                  <td style={{fontWeight:600,color:"#1e293b"}}>{ord.id}</td>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{
                        width:28,height:28,borderRadius:"50%",
                        background: cust.color+"22",
                        color: cust.color,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontWeight:700,fontSize:12,flexShrink:0
                      }}>{cust.avatar}</div>
                      <div>
                        <div style={{fontSize:12,fontWeight:600,color:"#1e293b"}}>{cust.name}</div>
                        <div style={{fontSize:11,color:"#94a3b8"}}>{cust.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{color:"#64748b"}}>{ord.item}</td>
                  <td style={{fontWeight:700,color:"#0f172a"}}>{ord.amount}</td>
                  <td style={{color:"#94a3b8"}}>{ord.date}</td>
                  <td><span className={`badge badge-${ord.status}`}>{ord.status.charAt(0).toUpperCase()+ord.status.slice(1)}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Analytics ─────────────────────────────────────────────────────────────────
const AnalyticsPage = () => {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const orders   = [42, 58, 51, 73, 69, 95, 88];
  const topItems = [
    { name:"🍔 Classic Burger", sold:214, pct:88 },
    { name:"🍕 Pepperoni Pizza", sold:187, pct:77 },
    { name:"🍣 Salmon Roll",     sold:163, pct:67 },
    { name:"🍩 Cheese Donut",    sold:140, pct:57 },
    { name:"🥤 Mango Smoothie",  sold:118, pct:49 },
  ];
  const maxO = Math.max(...orders);
  return (
    <div>
      <div className="page-header"><div className="page-title">Analytics</div><div className="page-sub">Food sales performance this week</div></div>
      <div className="stats-row" style={{marginBottom:18}}>
        {[
          {label:"Total Orders",       value:"476",    cls:"up",   pct:"+14.2%"},
          {label:"Best Selling Item",  value:"Burger", cls:"up",   pct:"#1 this week"},
          {label:"Avg Order Value",    value:"$12.40", cls:"up",   pct:"+3.8%"},
        ].map((s,i)=>(
          <div className="stat-card" key={i}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{fontSize:24}}>{s.value}</div>
            <span className={`stat-change ${s.cls}`}>{s.pct}</span>
            <div className="stat-bar" style={{background:["#E85D04","#52b788","#f59e0b"][i]}}/>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
        {/* Orders per day bar chart */}
        <div className="section-card">
          <div className="bar-chart-wrap">
            <div className="bar-chart-title">Orders Per Day</div>
            <div className="bars">
              {orders.map((v,i)=>(
                <div className="bar-col" key={i}>
                  <div className="bar-fill" style={{height:`${(v/maxO)*96}px`,background:i===5||i===6?"linear-gradient(180deg,#E85D04,#c74e03)":"linear-gradient(180deg,#fdba74,#fed7aa)"}}/>
                  <span className="bar-label">{days[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Top selling items */}
        <div className="section-card">
          <div className="bar-chart-wrap">
            <div className="bar-chart-title">Top Selling Items</div>
            {topItems.map((item,i)=>(
              <div key={i} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <span style={{fontSize:12,fontWeight:600,color:"#334155"}}>{item.name}</span>
                  <span style={{fontSize:11,color:"#94a3b8",fontWeight:500}}>{item.sold} sold</span>
                </div>
                <div style={{background:"#f1f5f9",borderRadius:99,height:7,overflow:"hidden"}}>
                  <div style={{width:`${item.pct}%`,height:"100%",borderRadius:99,background:i===0?"#E85D04":i===1?"#f59e0b":i===2?"#52b788":i===3?"#6366f1":"#06b6d4",transition:"width 0.6s ease"}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Customers ─────────────────────────────────────────────────────────────────
const CustomersPage = () => {
  const customerOrders = {
    "C001": [{id:"ORD #3041", item:"🍔 Classic Burger x2",  amount:"$17.98", status:"paid"   }],
    "C002": [{id:"ORD #3042", item:"🍕 Pepperoni Pizza x1", amount:"$11.50", status:"pending"}],
    "C003": [{id:"ORD #3043", item:"🍣 Salmon Roll x3",     amount:"$39.00", status:"failed" }],
    "C004": [{id:"ORD #3044", item:"🥤 Mango Smoothie x2",  amount:"$9.00",  status:"paid"   }],
    "C005": [{id:"ORD #3045", item:"🍩 Cheese Donut x4",    amount:"$13.00", status:"pending"}],
  };
  const [expanded, setExpanded] = useState(null);
  const statC = {paid:"paid", pending:"pending", failed:"failed"};

  return (
    <div>
      <div className="page-header" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div><div className="page-title">Customers</div><div className="page-sub">Manage customers and their orders</div></div>
        <button className="add-btn">+ Add Customer</button>
      </div>
      <div className="section-card">
        <div className="section-header">
          <span className="section-title">All Customers ({CUSTOMERS.length})</span>
          <button className="section-action">Export CSV →</button>
        </div>
        <table className="inv-table">
          <thead>
            <tr><th>Customer</th><th>Email</th><th>Total Orders</th><th>Total Spent</th><th>Latest Order</th><th>Status</th></tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => {
              const orders = customerOrders[c.id] || [];
              const totalSpent = orders.reduce((sum, o) => sum + parseFloat(o.amount.replace("$","")), 0);
              const latest = orders[orders.length - 1];
              const isOpen = expanded === c.id;
              return (
                <>
                  <tr key={c.id}
                    style={{cursor:"pointer"}}
                    onClick={() => setExpanded(isOpen ? null : c.id)}
                  >
                    <td>
                      <div style={{display:"flex",alignItems:"center",gap:9}}>
                        <div style={{width:30,height:30,borderRadius:"50%",background:c.color+"22",display:"flex",alignItems:"center",justifyContent:"center",color:c.color,fontWeight:700,fontSize:13,flexShrink:0}}>
                          {c.avatar}
                        </div>
                        <div>
                          <div style={{fontWeight:600,color:"#1e293b",fontSize:13}}>{c.name}</div>
                          <div style={{fontSize:11,color:"#94a3b8"}}>{c.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{color:"#64748b",fontSize:13}}>{c.email}</td>
                    <td style={{fontWeight:600,color:"#334155"}}>{orders.length} order{orders.length!==1?"s":""}</td>
                    <td style={{fontWeight:700,color:"#0f172a"}}>${totalSpent.toFixed(2)}</td>
                    <td style={{color:"#64748b",fontSize:12}}>{latest?.item || "—"}</td>
                    <td>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <span className={`badge badge-${statC[latest?.status]}`}>
                          {latest ? latest.status.charAt(0).toUpperCase()+latest.status.slice(1) : "—"}
                        </span>
                        <span style={{fontSize:11,color:"#94a3b8",marginLeft:8}}>{isOpen?"▲":"▼"}</span>
                      </div>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr key={`${c.id}-detail`}>
                      <td colSpan={6} style={{background:"#fafbfc",padding:"0 24px 16px"}}>
                        <div style={{paddingTop:12,borderTop:"1px solid #f1f5f9"}}>
                          <p style={{fontSize:11,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10}}>Order History</p>
                          {orders.map((o,i) => (
                            <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f1f5f9"}}>
                              <span style={{fontSize:12,fontWeight:600,color:"#1e293b",width:110}}>{o.id}</span>
                              <span style={{fontSize:12,color:"#64748b",flex:1}}>{o.item}</span>
                              <span style={{fontSize:12,fontWeight:700,color:"#0f172a",marginRight:16}}>{o.amount}</span>
                              <span className={`badge badge-${o.status}`}>{o.status.charAt(0).toUpperCase()+o.status.slice(1)}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Settings ──────────────────────────────────────────────────────────────────
const SettingsPage = () => {
  const [tog, setTog] = useState({email:true,sms:false,twofa:true,dark:false});
  return (
    <div>
      <div className="page-header"><div className="page-title">Settings</div><div className="page-sub">Manage your account and preferences</div></div>
      <div className="settings-grid">
        <div className="settings-section">
          <div className="settings-section-title">Account Details</div>
          {[["Full Name","Admin User"],["Email","admin@vantage.io"],["Role","Administrator"],["Timezone","Asia/Manila"],["Member Since","Jan 2024"]].map(([l,v],i)=>(
            <div className="setting-row" key={i}>
              <span className="setting-label">{l}</span><span className="setting-value">{v}</span>
            </div>
          ))}
          <button className="save-btn">Save Changes</button>
        </div>
        <div className="settings-section">
          <div className="settings-section-title">Notifications & Security</div>
          {[["email","Email Notifications"],["sms","SMS Alerts"],["twofa","Two-Factor Auth"],["dark","Dark Mode (soon)"]].map(([k,l])=>(
            <div className="setting-row" key={k}>
              <span className="setting-label">{l}</span>
              <button className={`toggle ${tog[k]?"on":"off"}`} onClick={()=>setTog(t=>({...t,[k]:!t[k]}))} aria-label={l}/>
            </div>
          ))}
          <button className="save-btn">Save Preferences</button>
        </div>
      </div>
    </div>
  );
};

// ── Login Screen ──────────────────────────────────────────────────────────────
const loginStyles = `
  .login-screen {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #f9c5a1; font-family: 'Inter', sans-serif;
  }
  .login-card-wrap { width: 100%; max-width: 380px; margin: 0 auto; }
  .login-box {
    background: white; border-radius: 24px; overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.18);
    animation: fadeUp 0.4s cubic-bezier(.16,1,.3,1);
  }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  .login-header {
    background: #E85D04; padding: 32px 0 26px;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .login-logo-text { color: white; font-size: 38px; font-weight: 900; letter-spacing: -1px; }
  .login-logo-dot  { width: 20px; height: 20px; background: #52b788; border-radius: 50%; margin: 0 3px; flex-shrink:0; }
  .login-body { padding: 28px 28px 24px; }
  .login-err { background:#fef2f2; border:1px solid #fecaca; color:#dc2626; border-radius:8px; padding:10px 14px; font-size:13px; margin-bottom:16px; }
  .l-label { display:block; font-size:11px; font-weight:600; color:#64748b; margin-bottom:5px; text-transform:uppercase; letter-spacing:.04em; }
  .l-input {
    width:100%; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:10px;
    padding:12px 14px; font-family:'Inter',sans-serif; font-size:14px; color:#1e293b;
    outline:none; transition:border .2s; margin-bottom:14px;
  }
  .l-input:focus { border-color:#E85D04; box-shadow:0 0 0 3px rgba(232,93,4,.08); }
  .l-submit {
    width:100%; background:#E85D04; color:white; border:none; border-radius:99px;
    padding:14px; font-family:'Inter',sans-serif; font-size:15px; font-weight:700;
    cursor:pointer; margin-top:6px; transition:background .18s, transform .12s;
    box-shadow: 0 4px 16px rgba(232,93,4,.35);
  }
  .l-submit:hover { background:#c74e03; transform:scale(1.01); }
  .l-submit:active { transform:scale(.98); }
  .l-hint { text-align:center; font-size:12px; color:#94a3b8; margin-top:16px; }

  /* Logout confirm modal */
  .modal-overlay {
    position:fixed; inset:0; background:rgba(0,0,0,0.45);
    display:flex; align-items:center; justify-content:center; z-index:999;
    animation: fadeIn .2s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .modal-box {
    background:white; border-radius:16px; padding:28px 28px 22px;
    width:320px; box-shadow:0 20px 60px rgba(0,0,0,.2);
    animation: popUp .25s cubic-bezier(.16,1,.3,1);
  }
  @keyframes popUp { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
  .modal-icon { font-size:36px; text-align:center; margin-bottom:12px; }
  .modal-title { font-size:16px; font-weight:800; color:#1e293b; text-align:center; margin-bottom:6px; }
  .modal-sub   { font-size:13px; color:#64748b; text-align:center; margin-bottom:22px; }
  .modal-btns  { display:flex; gap:10px; }
  .modal-cancel {
    flex:1; background:#f1f5f9; color:#334155; border:none; border-radius:10px;
    padding:11px; font-family:'Inter',sans-serif; font-size:13px; font-weight:600; cursor:pointer;
    transition:background .15s;
  }
  .modal-cancel:hover { background:#e2e8f0; }
  .modal-confirm {
    flex:1; background:#E85D04; color:white; border:none; border-radius:10px;
    padding:11px; font-family:'Inter',sans-serif; font-size:13px; font-weight:700; cursor:pointer;
    transition:background .15s;
  }
  .modal-confirm:hover { background:#c74e03; }
`;

// Demo credentials
const DEMO_EMAIL    = "admin@food.com";
const DEMO_PASSWORD = "food1234";

// ── Login Page ────────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        onLogin({ email, name: email.split("@")[0] });
      } else {
        setError("Invalid email or password. Try admin@food.com / food1234");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <>
      <style>{loginStyles}</style>
      <div className="login-screen">
        <div className="login-card-wrap">
          <div className="login-box">
            <div className="login-header">
              <span className="login-logo-text">Fo</span>
              <span className="login-logo-dot" />
              <span className="login-logo-text">d</span>
            </div>
            <div className="login-body">
              <p style={{fontSize:18,fontWeight:800,color:"#1e293b",marginBottom:4}}>Welcome back 👋</p>
              <p style={{fontSize:13,color:"#94a3b8",marginBottom:20}}>Sign in to your Food dashboard</p>
              {error && <div className="login-err">{error}</div>}
              <form onSubmit={handleSubmit}>
                <label className="l-label">Email Address</label>
                <input className="l-input" type="email" placeholder="admin@food.com"
                  value={email} onChange={e=>setEmail(e.target.value)} autoFocus />
                <label className="l-label">Password</label>
                <input className="l-input" type="password" placeholder="••••••••"
                  value={password} onChange={e=>setPassword(e.target.value)} />
                <button className="l-submit" type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
              <p className="l-hint">Demo: admin@food.com &nbsp;/&nbsp; food1234</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ── Logout Confirm Modal ──────────────────────────────────────────────────────
const LogoutModal = ({ onConfirm, onCancel }) => (
  <div className="modal-overlay" onClick={onCancel}>
    <div className="modal-box" onClick={e=>e.stopPropagation()}>
      <div className="modal-icon">🚪</div>
      <div className="modal-title">Log out?</div>
      <div className="modal-sub">You'll need to sign in again to access your dashboard.</div>
      <div className="modal-btns">
        <button className="modal-cancel"  onClick={onCancel}>Cancel</button>
        <button className="modal-confirm" onClick={onConfirm}>Yes, Log Out</button>
      </div>
    </div>
  </div>
);

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [user,         setUser]         = useState(null);   // null = logged out
  const [active,       setActive]       = useState("overview");
  const [showLogout,   setShowLogout]   = useState(false);  // modal visibility

  // ── Handlers ──
  const handleLogin  = (userData) => { setUser(userData); setActive("overview"); };
  const handleLogout = () => { setUser(null); setShowLogout(false); setActive("overview"); };

  // ── Show login screen if not authenticated ──
  if (!user) return <LoginPage onLogin={handleLogin} />;

  const pages = {
    overview:  { title:"Overview",  comp:<OverviewPage/>  },
    analytics: { title:"Analytics", comp:<AnalyticsPage/> },
    customers: { title:"Customers", comp:<CustomersPage/> },
    settings:  { title:"Settings",  comp:<SettingsPage/>  },
  };
  const today = new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const initials = user.name ? user.name[0].toUpperCase() : "A";

  return (
    <>
      <style>{styles}</style>
      <style>{loginStyles}</style>

      {/* Logout confirm modal */}
      {showLogout && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}

      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon">🍴</div>
            <span className="logo-name">Food</span>
          </div>
          <nav className="nav-list">
            {Object.entries(pages).map(([id,{title}])=>(
              <div key={id} className={`nav-item${active===id?" active":""}`} onClick={()=>setActive(id)}>
                {Ico[id]}{title}
              </div>
            ))}
          </nav>
          <div className="sidebar-bottom">
            {/* Clicking Log Out opens the confirm modal */}
            <button className="logout-btn" onClick={() => setShowLogout(true)}>
              Log Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="main">
          <div className="topbar">
            <div>
              <div className="topbar-title">{pages[active].title}</div>
              <div className="topbar-date">{today}</div>
            </div>
            {/* Avatar shows user initial */}
            <div className="avatar" title={user.email}>{initials}</div>
          </div>
          <div className="content">{pages[active].comp}</div>
        </div>
      </div>
    </>
  );
}