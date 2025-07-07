import { Head } from '@inertiajs/react';

export default function ( title, description, keywords, og_image, canonical ) {
  return (
    <Head>
      {title && <title>{title} — Республика Ингушетия</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* OpenGraph метатеги */}
      <meta property="og:type" content="article" />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {og_image && <meta property="og:image" content={og_image} />}
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content="Республика Ингушетия — официальный сайт" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {og_image && <meta name="twitter:image" content={og_image} />}

      {/* Каноническая ссылка */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Head>
  );
};
