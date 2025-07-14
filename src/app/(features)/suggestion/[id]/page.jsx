'use client'

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getSuggestionPost } from "../util/PostServiceApi";
import { getAnswerPost, createAnswerPost} from "../util/AnswerServiceApi";
import TitleSection from "./components/TitleSection";
import ContentSection from "./components/ContentSection";
import CommentSection from "../../comments/components/CommentSection";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";

// TuiEditor를 동적으로 import
const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  { ssr: false }
);

const page = () => {
  const params = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnswerEditor, setShowAnswerEditor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answerData, setAnswerData] = useState(null);
  const [answerTitle, setAnswerTitle] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const data = await getSuggestionPost(params.id);
        setPostData(data);
        
        // isAnswered가 true인 경우 답변 데이터도 가져오기
        if (data.isAnswered) {
          try {
            const answer = await getAnswerPost(data.id);
            setAnswerData(answer);
          } catch (answerErr) {
            console.error("답변을 불러오는 중 오류가 발생했습니다:", answerErr);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("게시글을 불러오는 중 오류가 발생했습니다:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPostData();
    }
  }, [params.id]);

  const handleAnswerSubmit = async () => {
    if (editorRef.current) {
      try {
        setIsSubmitting(true);
        
        const editorInstance = editorRef.current.getInstance();
        const markdownContent = editorInstance.getMarkdown();

        if (!answerTitle.trim()) {
          alert("답변 제목을 입력해주세요.");
          return;
        }
        if (!markdownContent.trim()) {
          alert("답변 내용을 입력해주세요.");
          return;
        }

        // AnswerService를 사용한 답변 생성
        const answerData = {
          title: answerTitle,
          suggestionPostId: postData.id,
          content: markdownContent,
          userId: 1 // 임시로 1로 설정 (실제 인증 시스템에서 가져와야 함)
        };

        const response = await createAnswerPost(answerData);
        console.log('답변 생성 성공:', response);
        
        // 성공 후 에디터 숨기고 게시글 새로고침
        alert("답변이 성공적으로 등록되었습니다!");
        setShowAnswerEditor(false);
        setAnswerTitle("");
        
        // 게시글 데이터 새로고침
        const updatedData = await getSuggestionPost(params.id);
        setPostData(updatedData);
        
        // 답변 데이터도 새로고침
        if (updatedData.isAnswered) {
          try {
            const answer = await getAnswerPost(updatedData.id);
            setAnswerData(answer);
          } catch (answerErr) {
            console.error("답변을 불러오는 중 오류가 발생했습니다:", answerErr);
          }
        }
        
      } catch (error) {
        console.error('답변 생성 에러:', error);
        alert("답변 생성에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancelAnswer = () => {
    setShowAnswerEditor(false);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (!postData) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <TitleSection title={postData.title}></TitleSection>
      <ContentSection
        userName={postData.userName}
        createdAt={postData.createdAt}
        isAnswered={postData.isAnswered}
        content={postData.content}
        likeCount={postData.likeCount}
        unlikeCount={postData.unlikeCount}
      />
      
      {/* 답변 표시 - isAnswered가 true일 때 */}
      {postData.isAnswered && answerData && (
        <div style={{ 
          margin: "20px 0", 
          padding: "20px", 
          border: "1px solid #28a745", 
          borderRadius: "5px",
          backgroundColor: "#f8fff9"
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "15px",
            paddingBottom: "10px",
            borderBottom: "1px solid #e9ecee"
          }}>
            <div style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "5px 10px",
              borderRadius: "15px",
              fontSize: "12px",
              marginRight: "10px"
            }}>
              답변
            </div>
            <span style={{ color: "#666", fontSize: "14px" }}>
              {answerData.userName || "매니저"} • {new Date(answerData.createdAt).toLocaleDateString()}
            </span>
          </div>
          {answerData.title && (
            <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}>{answerData.title}</div>
          )}
          <div style={{ 
            lineHeight: "1.6",
            fontSize: "16px"
          }}>
            {answerData.content}
          </div>
          <div style={{ 
            marginTop: "15px",
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ color: "#666" }}>👍</span>
              <span style={{ color: "#666", fontSize: "14px" }}>
                {answerData.likeCount || 0}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ color: "#666" }}>👎</span>
              <span style={{ color: "#666", fontSize: "14px" }}>
                {answerData.unlikeCount || 0}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* 답변 생성 버튼 - isAnswered가 false일 때만 표시 */}
      {!postData.isAnswered && !showAnswerEditor && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button
            onClick={() => setShowAnswerEditor(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#8876d9",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            답변 생성하기
          </button>
        </div>
      )}

      {/* 답변 에디터 */}
      {showAnswerEditor && (
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
          <h3 style={{ marginBottom: "15px" }}>답변 작성</h3>
          <input
            type="text"
            placeholder="답변 제목을 입력하세요"
            value={answerTitle}
            onChange={e => setAnswerTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
          <div style={{ width: "100%" }}>
            <Editor
              ref={editorRef}
              initialValue="답변을 입력하세요"
              previewStyle="vertical"
              width="100%"
              height="400px"
              initialEditType="markdown"
              useCommandShortcut={true}
            />
          </div>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <button
              onClick={handleAnswerSubmit}
              disabled={isSubmitting}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
                fontSize: "16px"
              }}
            >
              {isSubmitting ? "등록 중..." : "답변 등록"}
            </button>
            <button
              onClick={handleCancelAnswer}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              취소
            </button>
          </div>
        </div>
      )}

      <CommentSection postId={postData.id}></CommentSection>
    </div>
  );
};

export default page;
