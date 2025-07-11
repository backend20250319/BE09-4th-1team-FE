import React from "react";
import TitleSection from "./components/TitleSection";
import ContentSection from "./components/ContentSection";

const page = () => {
  const title = "프로젝트 발표 피드백 방식 개선 요청";
  const userName = "비니";
  const createdAt = "2025.06.11";
  const isAnswered = true;
  const content = "어쩌구 저쩌구 내용내용";

  return (
    <div>
      <TitleSection title={title}></TitleSection>
      <ContentSection
        userName={userName}
        createdAt={createdAt}
        isAnswered={isAnswered}
        content={content}
        likeCount={10}
        unlikeCount={3}
      />
      <ContentSection
        userName={userName}
        createdAt={createdAt}
        content={content}
        likeCount={10}
        unlikeCount={3}
        isAnswered={null}
      />
    </div>
  );
};

export default page;
