export interface DashboardItem {
    used: number
    max: number
}

export interface DashOverview {
    words_used: DashboardItem,
    images_generated: DashboardItem,
    media_to_text: DashboardItem,
    automated_posts: DashboardItem
}

export interface AdminDashItem {
    percentage: number
    type: 'increase' | 'decrease'
    total: string | number
}

export interface AdminDashOverview {
    total_users: AdminDashItem
    total_subscribers: AdminDashItem
    cost_incurred: AdminDashItem
    total_revenue: AdminDashItem
}