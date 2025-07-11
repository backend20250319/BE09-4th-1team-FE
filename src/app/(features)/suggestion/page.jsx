import React from "react";
import Title from "./components/Title";
import { Search } from "./components/Search";

const page = () => {
  return (
    <div>
      <Title
        title="Suggestion"
        subTitle="학원에 대한 불편사항이나 개선 아이디어가 있다면 자유롭게 남겨주세요."
      ></Title>
      <Search></Search>
    </div>
  );
};

export default page;
