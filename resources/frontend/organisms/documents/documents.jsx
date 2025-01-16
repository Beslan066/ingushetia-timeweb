import './documents.css'
import DocumentLink from "#/atoms/links/document-link.jsx";
import AppLink from "#/atoms/buttons/link.jsx";

export default function Documents({ documents }) {
  if (!documents || !documents.length) {
    return null;
  }

  const agencyPrefix = documents[0].agency_id ? `?agency_id=${documents[0].agency_id}` : '';

  return (
    <div className="documents__wrapper">
      <h2 className="documents__title">Документы</h2>
      <div className="documents">
        {
          documents.map((document) => <DocumentLink key={document.id} title={document.title} link={ `/documents/${document.id}` } type={ document.type }/>)
        }
      </div>
      <AppLink to={ `/documents${agencyPrefix}` } title="Все отчеты" />
    </div>
  )
}
