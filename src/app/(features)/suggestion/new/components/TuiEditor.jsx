"use client";
// components/Common/TuiEditor.js
import "@toast-ui/editor/dist/toastui-editor.css";
import styles from "@/app/(features)/suggestion/new/styles/newSuggestion.module.css";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { createSuggestionPost } from "../../util/PostServiceApi";
import { useRouter } from "next/navigation";

const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  { ssr: false }
);

const TuiEditor = () => {
  // 1. Editor 컴포넌트 인스턴스에 접근하기 위한 Ref 생성
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (editorRef.current) {
      try {
        setIsSubmitting(true);
        
        const editorInstance = editorRef.current.getInstance();
        const markdownContent = editorInstance.getMarkdown();
        console.log("마크다운 내용:", markdownContent);

        // 예시: 제목 가져오기 (input 필드에 ref를 추가하여 가져오는 것이 더 정확합니다)
        const titleInput = document.querySelector(`.${styles["input-title"]}`);
        const title = titleInput ? titleInput.value : "";
        console.log("제목:", title);

        if (!title.trim()) {
          alert("제목을 입력해주세요.");
          return;
        }

        if (!markdownContent.trim()) {
          alert("내용을 입력해주세요.");
          return;
        }

        // PostServiceApi를 사용한 실제 백엔드 POST 요청
        const postData = {
          title: title,
          content: markdownContent,
          // userId는 실제 인증 시스템에서 가져와야 합니다
          userId: 1 // 임시로 1로 설정
        };

        const response = await createSuggestionPost(postData);
        console.log('게시글 생성 성공:', response);
        
        // 성공 후 게시글 목록 페이지로 이동
        alert("게시글이 성공적으로 생성되었습니다!");
        router.push('/suggestion');
        
      } catch (error) {
        console.error('게시글 생성 에러:', error);
        alert("게시글 생성에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  //
  // 이미지 업로드 핸들러
  const handleImageUpload = async (blob, callback) => {
  //   // 1. FormData 생성 (이미지 파일을 담기 위함)
  //   const formData = new FormData();
  //   formData.append("image", blob); // 'image'는 서버에서 이미지를 받을 필드 이름입니다.

  //   try {
  //     // 2. 서버에 이미지 업로드 요청 (실제 API 엔드포인트로 변경하세요)
  //     const response = await fetch("/api/upload-image", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error("이미지 업로드 실패");
  //     }

  //     const data = await response.json();
  //     // 3. 서버에서 받은 이미지 URL로 에디터에 이미지 삽입
  //     // data.imageUrl는 서버에서 반환하는 이미지 URL 필드 이름이어야 합니다.
  //     callback(data.imageUrl, "alt text"); // 두 번째 인자는 대체 텍스트입니다.
  //   } catch (error) {
  //     console.error("이미지 업로드 오류:", error);
  //     alert("이미지 업로드에 실패했습니다.");
  //   }
    return false; // Toast UI Editor의 기본 이미지 업로드 동작을 막습니다.
  };

  return (
    <div className={styles.form}>
      <input
        className={styles["input-title"]}
        type="text"
        placeholder="제목 입력"
        name="title"
      />

      <div style={{ width: "80%" }}>
        <div style={{ textAlign: "left" }}>
          <Editor
            ref={editorRef}
            initialValue="건의 사항을 입력하세요"
            previewStyle="vertical"
            width="auto%"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            hooks={{
              addImageBlobHook: handleImageUpload, // 이미지 업로드 훅 추가
            }}
          />
        </div>
        <div style={{ textAlign: "center", marginBottom: "100px" }}>
          <input
            className={styles.button}
            type="button"
            value={isSubmitting ? "생성 중..." : "Submit"}
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{}}
          />
        </div>
      </div>
    </div>
  );
};

export default TuiEditor;
