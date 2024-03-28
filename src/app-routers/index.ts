export const MENU_TYPE_GROUP='group-menu';
export const MENU_TYPE_COLLAPSE='collapse-menu';
export const MENU_TYPE_ITEM='menu-item';
export const DASHBOARD_ROUTE="/dashboard";
export const USER_PROFILE_ROUTE="/user-profile";
export const USER_ROUTE="/user-management/users";
export const ROLE_ROUTE="/roles";
export const PERMISSION_ROUTE="/permissions";
export const MESSAGE_ROUTE="/support-tickets/messenger";

const protectedMenu=[
    {
        id:"dashboard",
        title:"Dashboard",
        type:MENU_TYPE_GROUP,
        permission:"",
        children:[
            {
                id:"dashboard-menu",
                title:"Dashboard",
                path:DASHBOARD_ROUTE,
                type:MENU_TYPE_ITEM,
                icon:"DashboardOutlined",
                permission:"",
            }
        ]

    },
    {
        id:"user-management",
        title:"User Management",
        type:MENU_TYPE_GROUP,
        permission:"",
        children:[
            {
                id:"user",
                title:"User",
                path:USER_ROUTE,
                type:MENU_TYPE_ITEM,
                icon:"ManageAccountsOutlined",
                permission:"",
            },
            {
                id:"role",
                title:"Role",
                path:ROLE_ROUTE,
                type:MENU_TYPE_ITEM,
                icon:"AdminPanelSettingsOutlined",
                permission:"",
            },
            {
                id:"permission",
                title:"Permission",
                path:PERMISSION_ROUTE,
                type:MENU_TYPE_ITEM,
                icon:"AdminPanelSettingsOutlined",
                permission:"",
            }
        ]

    },
    {
        id:"ticket-management",
        title:"Support Tickets",
        type:MENU_TYPE_GROUP,
        permission:"",
        children:[
            {
                id:"message",
                title:"Messenger",
                path:MESSAGE_ROUTE,
                type:MENU_TYPE_ITEM,
                icon:"MarkUnreadChatAltOutlined",
                permission:"",
            }
        ]

    }
]
export default {
    protected:protectedMenu
}