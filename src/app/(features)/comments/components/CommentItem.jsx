import styles from './comment-item.css';

export default function ({ item }) {
    return (
        <div className='item-container'>
            {/* item header */}
            <div className='item-header'>
                <div className='item-left'>
                    <span className='item-course'>풀스택 9기</span>
                    <span className='item-name'>비닝비닝</span>
                    <span className='item-date'>2025.07.02 · 17:50</span>
                </div>
                <div className='item-right'>
                    <div className='reaction'>
                        <span className='icon'>❤️</span>
                        <span className='like-count'>200</span>
                    </div>
                    <div className='reaction'>
                        <span className='icon'>💔</span>
                        <span className='dislike-count'>1</span>
                    </div>
                    <div className='menu-icon'>☰</div>
                </div>
            </div>

            {/* line */}
            <hr class='divider' />

            {/* content */}
            <div className='content-container'>
                <div className='content'>{item.content}</div>
            </div>
        </div>
    );
}
