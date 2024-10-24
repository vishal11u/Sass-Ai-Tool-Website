import React from 'react'
import WelcomeBanner from './_component/WelcomeBanner'
import CourseList from './_component/CourseList'

function Course() {
    return (
        <div className="p-5 grid grid-cols-1 md:grid-cols-3">
            {/* ----------------left container ------------------*/}
            <div className="col-span-2">
                <WelcomeBanner />
                <CourseList />
            </div>

            {/* ----------------right container -----------------*/}
            <div className="">
                Right Selection
            </div>
        </div>
    )
}

export default Course