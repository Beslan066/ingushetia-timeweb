import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import MunicipalityModal from "@/Components/MunicipalityModal.jsx";

export default function Municipality({ cities, district, baseUrl }) {
    const [selectedMunicipality, setSelectedMunicipality] = useState(null);

    useEffect(() => {
        if (cities && cities.length > 0) {
            setSelectedMunicipality(cities[0]);
        } else if (district && district.length > 0) {
            setSelectedMunicipality(district[0]);
        }
    }, [cities, district]);

    const handleCityClick = (city) => {
        setSelectedMunicipality(city);
    };

    const handleDistrictClick = (district) => {
        setSelectedMunicipality(district);
    };


    const [regionModal,setRegionModal] = React.useState(false);

    if (!selectedMunicipality) {
        return;
    }

    return (
        <section className="municipalities mb-32">
            <div className="container d-flex flex-column">
                <h3 className="mb-48 mt-32">Районы и округа</h3>
                <div className="d-flex flex-column-reverse flex-md-row-reverse gap-4 flex-xl-row w-100">
                    <div className="municipality-block w-100">
                        <div onClick={ () => setRegionModal(true) } className="municipality-image position-relative">
                            { selectedMunicipality && (
                                <>
                                    <img className="w-100 h-100 clean-image"
                                         src={ `${ baseUrl }/storage/${ selectedMunicipality.image_main }` }
                                         alt={ selectedMunicipality.title }/>
                                </>
                            ) }
                        </div>
                        <div className="municipality-facts municipality-info">
                            <div className="municipality-title">
                                <h4>{ selectedMunicipality.title }</h4>
                                <a className="d-none d-md-flex" onClick={ () => setRegionModal(true) } >
                                    Подробнее
                                    <img src="/img/icons/longarrow.svg" alt="" className={ 'pl-3' }/>
                                </a>
                            </div>
                            <div className="d-flex justify-content-between flex-wrap gap-6 align-items-center">
                                <div className="municipality-date d-flex d-md-none d-xl-flex flex-column">
                                    <span>Основан</span>
                                    <span>{ selectedMunicipality.year } г</span>
                                </div>
                                <div className="municipality-date d-flex flex-column">
                                    <span>Площадь</span>
                                    <span>{ selectedMunicipality.square }</span>
                                </div>
                                <div className="municipality-date d-flex flex-column">
                                    <span>Население</span>
                                    <span>{ selectedMunicipality.population }</span>
                                </div>
                                <div className="municipality-date d-flex d-md-none d-xl-flex flex-column">
                                    <span>Глава города</span>
                                    <span>{ selectedMunicipality.supervisor.name }</span>
                                </div>
                            </div>

                            <a className="more d-flex d-md-none" onClick={ () => setRegionModal(true) } >
                                Подробнее
                                <img src="/img/icons/longarrow.svg" alt="" className={ 'pl-3' }/>
                            </a>
                        </div>
                    </div>

                    <div className="municipality-city col-xxl-3 d-flex flex-column ml-xl-32">
                        <div className="d-flex flex-column mb-4">
                            <h4 className="mb-24">Городские округа</h4>
                            { cities && (
                                <ul className="d-flex flex-column mb-32">
                                    { cities.map((city) => (
                                        <li
                                            key={ city.title }
                                            onClick={ () => handleCityClick(city) }
                                            className={ selectedMunicipality && selectedMunicipality.title === city.title ? "active" : "" }
                                        >
                                            { city.title }
                                        </li>
                                    )) }
                                </ul>
                            ) }
                        </div>
                        <div className="d-flex flex-column">
                            <h4 className="mb-24">Муниципальные районы</h4>
                            { district && (
                                <ul className="d-flex flex-column mb-32">
                                    { district.map((district) => (
                                        <li
                                            key={ district.title }
                                            onClick={() => handleDistrictClick(district)}
                                            className={selectedMunicipality && selectedMunicipality.title === district.title ? "active" : ""}
                                        >
                                            {district.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {selectedMunicipality &&
                <MunicipalityModal active={regionModal}
                                   onClose={() => setRegionModal(false)}
                                   title={selectedMunicipality.title}
                                   arms={selectedMunicipality.arms}
                                   content={selectedMunicipality.content}
                                   square={selectedMunicipality.square}
                                   year={selectedMunicipality.year}
                                   population={selectedMunicipality.population}
                                   supervisorName={selectedMunicipality.supervisor.name}
                                   supervisorImage={selectedMunicipality.supervisor.image_main}
                                   supervisorBio={selectedMunicipality.supervisor.bio}
                                   baseUrl={baseUrl}
                />
            }

        </section>
    );
}
