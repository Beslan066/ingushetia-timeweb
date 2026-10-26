import './documents.css';
import DocumentLink from "#/atoms/links/document-link.jsx";
import AppLink from "#/atoms/buttons/link.jsx";

export default function Documents({ documents, agencySlug }) {
  // Если документов нет — ничего не рендерим
  if (!documents || !documents.length) {
    return null;
  }

  return (
    <div className="documents__wrapper">
      <h2 className="documents__title">Документы</h2>

      <div className="documents">
        {documents.map((document) => (
          <DocumentLink
            key={document.id}
            title={document.title}
            link={`/documents/${document.id}`}
            type={document.type}
          />
        ))}
      </div>

      <AppLink
        to={`/agencies/${agencySlug}/documents`}
        title="Все документы"
      />
    </div>
  );
}
