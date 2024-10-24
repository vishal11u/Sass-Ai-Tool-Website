import React from 'react'
import SideNav from './_component/SideNav'
import Header from './_component/Header'

function layout({ children }) {
    return (
        <div>
            <div className="sm:w-64 sm:block hidden fixed">
                <SideNav />
            </div>
            <div className="ml-64">
                <Header />
                {children}
            </div>
        </div>
    )
}

export default layout