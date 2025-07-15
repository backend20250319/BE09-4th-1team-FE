'use client';

import React from 'react';

const Footer = () => {
    return (
        <footer
            style={{
                width: '100%',
                padding: '20px',
                textAlign: 'center',
                backgroundColor: '#f1f1f1',
                borderTop: '1px solid #ddd',
                fontSize: '14px',
                color: '#555',
                marginTop: '40px',
            }}
        >
            <p>© {new Date().getFullYear()} Playvoice. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
