import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import BackToTop from "#/atoms/topButton/BackToTop.jsx";
import { Head, Link, usePage } from "@inertiajs/react";
import './survey.css';

export default function Success() {
  const { props } = usePage();
  const { meta } = props;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={false} />
      <PageTitle title="Спасибо за участие!" />

      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="survey__success">
            <p>Ваш ответ успешно учтён. Благодарим за участие в социологическом исследовании!</p>
            <Link href="/" className="survey__back-link">← Вернуться на главную</Link>
          </div>
        </div>
      </div>
      <AppFooter />
      <BackToTop />
    </>
  );
}