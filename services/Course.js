import axios from "axios";

export const getCourseList = async () => {
  const res = await axios.get("http://localhost:5000/api/courses");
  return res.data;
};
