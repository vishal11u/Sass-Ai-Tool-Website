import React from 'react'
import WelcomeBanner from './_component/WelcomeBanner'
import CourseList from './_component/CourseList'

function Course() {
    return (
        <div className="">
            {/* ----------------left container ------------------*/}
            <div className="">
                {/* <WelcomeBanner /> */}
                <CourseList />
            </div>

            {/* ----------------right container -----------------*/}
            {/* <div className="">
                Right Selection
            </div> */}
        </div>
    )
}

export default Course