import Image from "next/image";
import React from "react";

function CourseCard({ course }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md cursor-pointer transition-all ease-in-out duration-200 hover:scale-[1.02]">
      <Image
        src={course?.courseImage}
        alt="courseImage"
        width={500}
        height={150}
        className="w-full h-32 object-cover"
      />
      <div className="p-2 space-y-2">
        <p className="text-[16px] font-semibold">{course?.courseTitle}</p>
        <p className="text-[13px] font-semibold text-gray-600">
          {course?.courseDescription}
        </p>
        <div className="flex items-center justify-between">
          <p
            className={`text-[13px] w-[40%] rounded-md py-1 text-center font-semibold ${
              course?.courseStatus === "pending"
                ? "bg-yellow-200 text-yellow-500"
                : course?.courseStatus === "start"
                ? "bg-green-200 text-green-600"
                : "bg-orange-200 text-orange-500"
            }`}
          >
            {course?.courseStatus === "pending"
              ? "Pending"
              : course?.courseStatus === "start"
              ? "Start"
              : "Completed"}
          </p>
          <h1 className="">{course?.countOfChapters} Chapters</h1>
        </div>
      </div>
      <button
        type="button"
        className="bg-orange-400 text-white w-full py-1.5 font-semibold text-[17px]"
      >
        Start Course
      </button>
    </div>
  );
}

export default CourseCard;
