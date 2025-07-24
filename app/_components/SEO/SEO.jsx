"use client";

import React from 'react';
import Head from 'next/head';

const SEO = ({ title, description, keywords, author, openGraph }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={openGraph?.type || 'website'} />
            <meta property="og:url" content={openGraph?.url} />
            <meta property="og:title" content={openGraph?.title || title} />
            <meta property="og:description" content={openGraph?.description || description} />
            {openGraph?.images && openGraph.images.map((image, index) => (
                <meta property={`og:image`} content={image.url} key={`og-image-${index}`} />
            ))}
            <meta property="og:site_name" content={openGraph?.siteName} />
            <meta property="og:locale" content={openGraph?.locale || 'en_US'} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={openGraph?.url} />
            <meta property="twitter:title" content={openGraph?.title || title} />
            <meta property="twitter:description" content={openGraph?.description || description} />
            {openGraph?.images && openGraph.images.map((image, index) => (
                <meta property={`twitter:image`} content={image.url} key={`twitter-image-${index}`} />
            ))}
            <meta property="twitter:site" content="@yourTwitterHandle" /> {/* Replace with your twitter handle */}
            <meta property="twitter:creator" content="@yourTwitterHandle" />{/* Replace with your twitter handle */}

            {/* ... any other meta tags ... */}
        </Head>
    );
};

export default SEO;