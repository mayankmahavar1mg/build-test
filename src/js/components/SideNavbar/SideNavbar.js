import React, { useState, useEffect } from 'react'
import { Link, useLocation } from '@tata1mg/router'
import css from './SideNavbar.scss'

// Navigation config embedded in component
const NAVBAR_CONFIG = {
    sidebar: {
        enabled: true,
        position: "left",
        width: "250px",
        theme: "light",
        collapsible: true,
        defaultCollapsed: true
    },
    navigation: {
        items: [
            {
                title: "Home",
                path: "/",
                icon: "🏠"
            },
            {
                title: "Core Concepts",
                path: "/docs/core-concepts",
                icon: "⚡",
                children: [
                    {
                        title: "App Shell",
                        path: "/docs/core-concepts/app-shell"
                    },
                    {
                        title: "Data Fetching",
                        path: "/docs/core-concepts/data-fetching"
                    },
                    {
                        title: "Routing",
                        path: "/docs/core-concepts/routing"
                    },
                    {
                        title: "State Management",
                        path: "/docs/core-concepts/state-management"
                    },
                    {
                        title: "Fetch Function",
                        path: "/docs/core-concepts/fetch-function"
                    },
                    {
                        title: "Lifecycle Methods",
                        path: "/docs/core-concepts/lifecycle"
                    }
                ]
            },
            {
                title: "Features",
                path: "/docs/features",
                icon: "🔧",
                children: [
                    {
                        title: "Styling",
                        path: "/docs/features/styling"
                    },
                    {
                        title: "Code Splitting",
                        path: "/docs/features/code-splitting"
                    },
                    {
                        title: "Middleware",
                        path: "/docs/features/middleware"
                    },
                    {
                        title: "Assets",
                        path: "/docs/features/assets"
                    },
                    {
                        title: "Dynamic Metadata",
                        path: "/docs/features/dynamic-metadata"
                    },
                    {
                        title: "Custom Document",
                        path: "/docs/features/custom-document"
                    },
                    {
                        title: "Module Aliases",
                        path: "/docs/features/module-aliases"
                    },
                    {
                        title: "CSRF",
                        path: "/docs/features/csrf"
                    },
                    {
                        title: "Suspense",
                        path: "/docs/features/suspense"
                    },
                    {
                        title: "Fonts",
                        path: "/docs/features/fonts"
                    }
                ]
            },
            {
                title: "Styling Demo",
                path: "/styling",
                icon: "🎨"
            },
            {
                title: "Products",
                path: "/products",
                icon: "🛍️"
            },
            {
                title: "About",
                path: "/about",
                icon: "ℹ️"
            }
        ]
    }
}

const SideNavbar = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [expandedItems, setExpandedItems] = useState(new Set())
    const location = useLocation()

    useEffect(() => {
        // Initialize with embedded config
        const defaultCollapsed = NAVBAR_CONFIG.sidebar.defaultCollapsed || false
        setCollapsed(defaultCollapsed)
        
        // Initialize CSS custom property
        const app = document.querySelector('.app')
        if (app) {
            app.style.setProperty('--sidebar-width', defaultCollapsed ? '60px' : '250px')
        }
    }, [])

    const toggleCollapse = () => {
        const newCollapsed = !collapsed
        setCollapsed(newCollapsed)
        
        // Update CSS custom property for main content margin
        const app = document.querySelector('.app')
        if (app) {
            app.style.setProperty('--sidebar-width', newCollapsed ? '60px' : '250px')
        }
    }

    const toggleExpanded = (itemTitle) => {
        const newExpanded = new Set(expandedItems)
        if (newExpanded.has(itemTitle)) {
            newExpanded.delete(itemTitle)
        } else {
            newExpanded.add(itemTitle)
        }
        setExpandedItems(newExpanded)
    }

    const isActive = (path) => {
        return location.pathname === path
    }

    const isChildActive = (children) => {
        return children?.some(child => isActive(child.path)) || false
    }

    const renderNavItem = (item, level = 0) => {
        const hasChildren = item.children && item.children.length > 0
        const isExpanded = expandedItems.has(item.title)
        const isItemActive = isActive(item.path) || isChildActive(item.children)

        return (
            <div key={item.title} className={css.navItem} style={{ paddingLeft: `${level * 20}px` }}>
                <div className={`${css.navLink} ${isItemActive ? css.active : ''}`}>
                    {hasChildren ? (
                        <button 
                            className={css.expandButton}
                            onClick={() => toggleExpanded(item.title)}
                        >
                            <span className={css.icon}>{item.icon}</span>
                            {!collapsed && (
                                <>
                                    <span className={css.title}>{item.title}</span>
                                    <span className={`${css.arrow} ${isExpanded ? css.expanded : ''}`}>
                                        ▼
                                    </span>
                                </>
                            )}
                        </button>
                    ) : (
                        <Link to={item.path} className={css.link}>
                            <span className={css.icon}>{item.icon}</span>
                            {!collapsed && <span className={css.title}>{item.title}</span>}
                        </Link>
                    )}
                </div>
                
                {hasChildren && isExpanded && !collapsed && (
                    <div className={css.children}>
                        {item.children.map(child => renderNavItem(child, level + 1))}
                    </div>
                )}
            </div>
        )
    }

    if (!NAVBAR_CONFIG.sidebar.enabled) {
        return null
    }

    return (
        <div className={`${css.sidebar} ${collapsed ? css.collapsed : ''}`}>
            <div className={css.header}>
                {!collapsed && <h2 className={css.logo}>Catalyst</h2>}
                {NAVBAR_CONFIG.sidebar.collapsible && (
                    <button 
                        className={css.collapseButton}
                        onClick={toggleCollapse}
                        title={collapsed ? 'Expand' : 'Collapse'}
                    >
                        {collapsed ? '→' : '←'}
                    </button>
                )}
            </div>
            
            <nav className={css.navigation}>
                {NAVBAR_CONFIG.navigation.items.map(item => renderNavItem(item))}
            </nav>
            
            <div className={css.footer}>
                {!collapsed && (
                    <div className={css.footerContent}>
                        <p>Catalyst Framework</p>
                        <small>v1.0.0</small>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideNavbar 