"use client";
import { getCourseList } from "@/services/Course";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CourseCard from "./CourseCard";

function CourseList() {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    getCourseList()
      .then((res) => {
        setCourseList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mt-5 p-5 bg-white rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Course List</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="free">Free</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3">
        {courseList.map((list, index) => (
          <div className="mt-5" key={index}>
            <CourseCard course={list} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
