import React from 'react'
import MunicipalityModal from "@/Components/MunicipalityModal.jsx";


export default function MunicipalityList({active, title, population, arms, content, baseUrl, square, year, supervisor}) {

    const [regionModal,setRegionModal] = React.useState(false);

    return (
        <div>
            <li onClick={() => setRegionModal(true)}>
                <div>
                    <h4>{title}</h4>
                    <span>{population} чел.</span>
                </div>
                <img src="../../img/icons/arrow grey.svg" alt=""/>
            </li>

            <MunicipalityModal
                active={regionModal} onClose={() => setRegionModal(false)}
                title={title}
                population={population}
                content={content}
                arms={arms}
                baseUrl={baseUrl}
                year={year}
                square={square}
                supervisorName={supervisor.name}
                supervisorImage={supervisor.image_main}
                supervisorBio={supervisor.bio}
            />
        </div>
    )
}
