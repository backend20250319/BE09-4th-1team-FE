'use client';

import { redirect } from "next/navigation";
import LoginPage from "./(features)/login/LoginPage";


export default function Home() {
  // redirect('/comments'); // 댓글 컴포넌트 이동
  redirect("/login");
  return <LoginPage />
}
