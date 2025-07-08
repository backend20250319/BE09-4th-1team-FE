import { redirect } from 'next/navigation';

export default function Home() {
    redirect('/comments'); // 댓글 컴포넌트 이동
}
