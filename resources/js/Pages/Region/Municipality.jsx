import "../../../../public/css/region.css";
import Guest from "@/Layouts/GuestLayout.jsx";
import {Link, Head, usePage} from '@inertiajs/react';
import React from 'react'
import MunicipalityModal from "@/Components/MunicipalityModal.jsx";
import Map from "@/Components/Map.jsx";
import MunicipalityList from "@/Components/Region/MunicipalityList.jsx";



export default function Municipality() {

    const [regionModal,setRegionModal] = React.useState(false);

    let {cities, districts} = usePage().props;

    const baseUrl = import.meta.env.VITE_APP_URL;


    return (
        <Guest>
            <main className="mt-xl-40">
                <div className="container">
                    <h2 className="mb-32">Муниципальные образования</h2>
                </div>
                <div className="container d-flex flex-column gap-4 flex-xl-row w-full  col-xxl-12 municipality-page">
                    <div className="main-left col-xxl-9">
                        <Map />

                        <div className="mb-32 mt-32">
                            <p>
                                Республика была последним субъектом Федерации, в котором были образованы органы местного
                                самоуправления, это произошло лишь в 2009 году.
                                Тогда были созданы 4 городских округа, 4 муниципальных района и 38 сельских поселений,
                                одно из
                                которых в 2015 году получило статус городского поселения, а в конце
                                2016 года преобразовано в городской округ. Ещё одно в 2010 году ликвидировано путём
                                присоединения к другому сельскому поселению.
                            </p>
                        </div>

                        <div className="cities mb-32">
                            <h3 className="mb-24">Городские округа</h3>
                            <ul>
                                {cities &&
                                    cities.map((city) => (
                                        <MunicipalityList
                                            active={() => setRegionModal(true)}
                                            title={city.title}
                                            content={city.content}
                                            arms={city.arms}
                                            population={city.population}
                                            baseUrl={baseUrl}
                                            year={city.year}
                                            square={city.square}
                                            supervisor={city.supervisor}

                                        />
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="municipalities-items mb-32">
                            <h3 className="mb-24">Муниципальные районы</h3>
                            <ul>
                                {districts &&
                                    districts.map((city) => (
                                        <MunicipalityList
                                            active={() => setRegionModal(true)}
                                            title={city.title}
                                            population={city.population}

                                        />
                                    ))

                                }
                            </ul>
                        </div>

                    </div>
                    <div className="main-right">
                        <div className="d-flex flex-column mb-32 region-links">
                            <ul className="region-pager">
                                <li><Link href="/region">О Республике</Link></li>
                                <li><Link href="/history">История</Link></li>
                                <li><Link href="/economic">Экономика</Link></li>
                                <li className="active"><Link href="">Муниципальные образования</Link></li>
                                <li><Link href={route('socialEconomicDevelopment')}>Социально-экономическое
                                    развитие</Link></li>
                                <li><Link href="">Реализация стратегических инициатив Президента РФ</Link></li>
                                <li><Link href="/economic-support">Поддержка экономики и граждан</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <MunicipalityModal
                active={regionModal} onClose={() => setRegionModal(false)}

            />
        </Guest>
)
}
