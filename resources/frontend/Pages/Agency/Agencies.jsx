import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import { ExternalResourceInline } from "#/atoms/links/external-resource.jsx";

import './agencies.css'

export default function Agencies({ agencies }) {
  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Министерства и ведомства"/>
      <div className="agency-page-content__wrapper">
        <div className="page-content__content">
          {
            agencies && agencies.map((agency) => <ExternalResourceInline key={ agency.id } title={ agency.name } highlightedDescription={ agency.supervisor.name } link={ `/agencies/${agency.slug}` }/>)
          }
        </div>
      </div>
      <AppFooter/>
    </>
  )
}
