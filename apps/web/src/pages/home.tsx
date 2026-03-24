import { useState } from "react";
import { UserDto } from "@example/shared";
import { useTranslation } from "@example/i18n";
import "@example/ui/styles/home/home.css";

/* ============================================
   SVG Icons
   ============================================ */

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconCamera = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconLogOut = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ============================================
   Home Page Component
   ============================================ */

interface HomeProps {
  onLogout: () => void;
  user?: UserDto | null;
}

const Home: React.FC<HomeProps> = ({ onLogout, user }) => {
  const { t } = useTranslation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");

  const displayName = user?.name || user?.email?.split("@")[0] || "";

  const menuItems = [
    { id: "home", icon: IconHome, labelKey: "home_menu_home" },
    { id: "webcam", icon: IconCamera, labelKey: "home_menu_webcam" },
  ];

  const handleMenuClick = (id: string) => {
    setActiveMenu(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="home-page">
      {/* Mobile Overlay */}
      <div
        className={`home-mobile-overlay${isMobileMenuOpen ? " open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside className={`home-mobile-sidebar${isMobileMenuOpen ? " open" : ""}`}>
        <div className="home-mobile-sidebar-header">
          <h2>{t("home_menu")}</h2>
          <button
            className="home-mobile-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label={t("close")}
          >
            <div className="home-menu-item-icon">
              <IconX />
            </div>
          </button>
        </div>
        <nav className="home-mobile-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`home-menu-item${item.id === activeMenu ? " active" : ""}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <span className="home-menu-item-icon">
                <item.icon />
              </span>
              <span className="home-menu-item-label">{t(item.labelKey)}</span>
            </button>
          ))}
        </nav>
        <div className="home-mobile-footer">
          <button className="home-menu-item">
            <span className="home-menu-item-icon">
              <IconSettings />
            </span>
            <span className="home-menu-item-label">{t("home_menu_settings")}</span>
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className={`home-sidebar${isSidebarCollapsed ? " collapsed" : ""}`}>
        <div className="home-sidebar-header">
          <h2>{t("home_menu")}</h2>
          <button
            className="home-sidebar-toggle"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            aria-label={isSidebarCollapsed ? t("home_menu_expand") : t("home_menu_collapse")}
          >
            <div className="home-menu-item-icon">
              {isSidebarCollapsed ? <IconChevronRight /> : <IconChevronLeft />}
            </div>
          </button>
        </div>
        <nav className="home-sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`home-menu-item${item.id === activeMenu ? " active" : ""}`}
              onClick={() => handleMenuClick(item.id)}
              title={isSidebarCollapsed ? t(item.labelKey) : undefined}
            >
              <span className="home-menu-item-icon">
                <item.icon />
              </span>
              <span className="home-menu-item-label">{t(item.labelKey)}</span>
            </button>
          ))}
        </nav>
        <div className="home-sidebar-footer">
          <button
            className="home-menu-item"
            title={isSidebarCollapsed ? t("home_menu_settings") : undefined}
          >
            <span className="home-menu-item-icon">
              <IconSettings />
            </span>
            <span className="home-menu-item-label">{t("home_menu_settings")}</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="home-main">
        {/* Header */}
        <header className="home-header">
          <div className="home-header-content">
            <div className="home-header-left">
              <button
                className="home-mobile-menu-button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label={t("home_menu")}
              >
                <div className="home-menu-item-icon">
                  <IconMenu />
                </div>
              </button>
              <h1 className="home-header-title">{t("home_dashboard")}</h1>
            </div>

            <div className="home-header-right">
              <button
                className="home-notification-button"
                aria-label={t("home_notifications")}
              >
                <div className="home-menu-item-icon">
                  <IconBell />
                </div>
                <span className="home-notification-badge" />
              </button>

              <div className="home-user-profile">
                <div className="home-user-avatar">
                  {user?.picture ? (
                    <img src={user.picture} alt={displayName} />
                  ) : (
                    <div className="home-user-avatar-fallback">
                      <IconUser />
                    </div>
                  )}
                </div>
                <span className="home-user-name">{displayName}</span>
              </div>

              <button className="home-logout-button" onClick={onLogout}>
                <div className="home-menu-item-icon">
                  <IconLogOut />
                </div>
                <span>{t("logout")}</span>
              </button>

              <button
                className="home-logout-button-mobile"
                onClick={onLogout}
                aria-label={t("logout")}
              >
                <div className="home-menu-item-icon">
                  <IconLogOut />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="home-content">
          <div className="home-content-inner">
            <h2 className="home-welcome-title">
              {t("home_welcome", { name: displayName })}
            </h2>
            <p className="home-welcome-message">{t("home_welcome_message")}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
