import { Link, useLocation } from "react-router-dom"
import { SidebarMenuData } from "../Sidebar/SIdebarMenuData"
import "../Styles/Layout.css"
function Layout({children}){
    const location = useLocation()
    return(
        <>
<div className="main">
    <div className="layout">
        <div className="sidebar">
<div className="logo">
    <h6>DOCRTOR</h6>
    <hr />
</div>
<div className="menu">{

    SidebarMenuData.map((e)=>{
        const isActive = location.pathname === e.path
        return(
            <>
            <div className={`menu-item ${isActive && 'active'}`}>
                <i className={e.icon} ></i>
                <Link to={e.path} >{e.name}</Link>
            </div>
            </>
        )
    })
}</div>
        </div>
        <div className="content">
<div className="header">Header</div>
<div className="body">{children}</div>
        </div>
    </div>
</div>


        </>
    )
}
export default Layout