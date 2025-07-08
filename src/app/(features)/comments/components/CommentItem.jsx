import styles from './comment-item.css';

export default function ({ item }) {
    return (
        <div className='item-container'>
            {/* item header */}
            <div className='item-header'>
                <div className='item-left'>
                    <span className='course'>{item.author.course}</span>
                    <span className='name'>{item.author.name}</span>
                    <span className='date'>{item.createdAt}</span>
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
