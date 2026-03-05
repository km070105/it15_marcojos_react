import { useState } from 'react'
import './Dashboard.css'

// ── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all',     label: 'All',      emoji: '🍽️' },
  { id: 'burger',  label: 'Burgers',  emoji: '🍔' },
  { id: 'pizza',   label: 'Pizza',    emoji: '🍕' },
  { id: 'sushi',   label: 'Sushi',    emoji: '🍣' },
  { id: 'drinks',  label: 'Drinks',   emoji: '🧃' },
  { id: 'dessert', label: 'Dessert',  emoji: '🍩' },
]

const FOODS = [
  { id: 1, name: 'Classic Burger',  price: 8.99,  rating: 4.8, emoji: '🍔', cat: 'burger' },
  { id: 2, name: 'Margherita',      price: 11.50, rating: 4.7, emoji: '🍕', cat: 'pizza' },
  { id: 3, name: 'Salmon Roll',     price: 13.00, rating: 4.9, emoji: '🍣', cat: 'sushi' },
  { id: 4, name: 'Mango Smoothie',  price: 4.50,  rating: 4.6, emoji: '🥤', cat: 'drinks' },
  { id: 5, name: 'Cheese Donut',    price: 3.25,  rating: 4.5, emoji: '🍩', cat: 'dessert' },
  { id: 6, name: 'BBQ Burger',      price: 9.75,  rating: 4.7, emoji: '🍔', cat: 'burger' },
  { id: 7, name: 'Pepperoni',       price: 12.00, rating: 4.6, emoji: '🍕', cat: 'pizza' },
  { id: 8, name: 'Tuna Maki',       price: 10.50, rating: 4.8, emoji: '🍱', cat: 'sushi' },
]

// ── Icons ─────────────────────────────────────────────────────────────────────
const HomeIcon  = ({ size=22 }) => <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
const SearchIcon = ({ size=18 }) => <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
const CartIcon  = ({ size=22 }) => <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
const HeartIcon = ({ size=22 }) => <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
const UserIcon  = ({ size=22 }) => <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
const LogOutIcon = ({ size=14 }) => <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
const StarIcon  = ({ size=11 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>

// ── Dashboard Component ───────────────────────────────────────────────────────
export default function Dashboard({ user, onLogout }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeNav, setActiveNav]           = useState('home')
  const [cartCount, setCartCount]           = useState(0)
  const [search, setSearch]                 = useState('')

  const filtered = FOODS.filter(f => {
    const matchCat = activeCategory === 'all' || f.cat === activeCategory
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const capitalize = str => str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

  return (
    <div className="dashboard">
      {/* ── Header ── */}
      <div className="dash-header">
        <div className="dash-header-top">
          <div>
            <p className="dash-greeting">Good afternoon 👋</p>
            <p className="dash-name">{capitalize(user?.name) || 'Foodie'}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="logout-btn" onClick={onLogout}>
              <LogOutIcon /> Sign out
            </button>
            <div className="dash-avatar">
              {(user?.name?.[0] || 'U').toUpperCase()}
            </div>
          </div>
        </div>
        <div className="dash-search">
          <SearchIcon />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for food..."
          />
        </div>
      </div>

      {/* ── Featured Banner ── */}
      <div className="featured-banner">
        <div>
          <span className="featured-tag">🔥 Today's Deal</span>
          <p className="featured-title">Burger &<br/>Fries Combo</p>
          <button className="featured-btn">Order Now</button>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Categories</span>
          <button className="section-see-all">See all</button>
        </div>
        <div className="categories-row">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`cat-chip${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Food Grid ── */}
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="section-header">
          <span className="section-title">
            {activeCategory === 'all' ? 'Popular Items' : CATEGORIES.find(c => c.id === activeCategory)?.label}
          </span>
          <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{filtered.length} items</span>
        </div>
      </div>
      <div className="food-grid">
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '32px 0', color: 'var(--gray-400)', fontSize: 14 }}>
            No items found 😕
          </div>
        ) : (
          filtered.map(food => (
            <div key={food.id} className="food-card">
              <div className="food-card-img">{food.emoji}</div>
              <div className="food-card-body">
                <p className="food-card-name">{food.name}</p>
                <div className="food-card-meta">
                  <div>
                    <p className="food-card-price">${food.price.toFixed(2)}</p>
                    <div className="food-card-rating">
                      <StarIcon /> {food.rating}
                    </div>
                  </div>
                  <button className="add-btn" onClick={() => setCartCount(c => c + 1)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Bottom Nav ── */}
      <div className="dash-bottom-nav">
        {[
          { id: 'home',    label: 'Home',     Icon: HomeIcon },
          { id: 'search',  label: 'Search',   Icon: SearchIcon },
          { id: 'cart',    label: 'Cart',     Icon: CartIcon,  badge: cartCount > 0 },
          { id: 'fav',     label: 'Saved',    Icon: HeartIcon },
          { id: 'profile', label: 'Profile',  Icon: UserIcon },
        ].map(({ id, label, Icon, badge }) => (
          <button
            key={id}
            className={`nav-item${activeNav === id ? ' active' : ''}`}
            onClick={() => setActiveNav(id)}
          >
            <div className={badge ? 'cart-badge' : undefined}>
              <Icon />
              {badge && <span className="cart-badge-dot" />}
            </div>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}