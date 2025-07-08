import styles from './comment-item.css';

export default function ({ item }) {
    const isLiked = true;
    const isUnliked = true;

    return (
        <div className='item-container'>
            {/* item header */}
            <div className='item-header'>
                {/* user info */}
                <div className='item-left'>
                    <span className='course'>{item.author.course}</span>
                    <span className='name'>{item.author.name}</span>
                    <span className='date'>{item.createdAt}</span>
                </div>
                <div className='item-right'>
                    {/* like */}
                    <div className='reaction'>
                        <img
                            src={`/images/comments/${isLiked ? 'like-on.png' : 'like-off.png'}`}
                            alt='like icon'
                            className='icon'
                        />
                        <span className='like-count'>{item.likeCount}</span>
                    </div>
                    {/* unlike */}
                    <div className='reaction'>
                        <img
                            src={`/images/comments/${isUnliked ? 'unlike-on.png' : 'unlike-off.png'}`}
                            alt='unlike icon'
                            className='icon'
                        />
                        <span className='unlike-count'>{item.unlikeCount}</span>
                    </div>
                    {/* menu */}
                    <div className='menu'>
                        <img src={`/images/comments/menu.png`} alt='menu icon' className='icon' />
                    </div>
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
