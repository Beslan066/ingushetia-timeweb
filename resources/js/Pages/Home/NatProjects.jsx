import Guest from "@/Layouts/GuestLayout.jsx";
import Accordion from "@/Components/Region/Accordion.jsx";
import React from "react";
import {usePage} from "@inertiajs/react";
import {useState} from "react";


export default function NatProjects() {

    let {natProjects} = usePage().props;

    const baseUrl = import.meta.env.VITE_APP_URL;

    const [openItemId, setOpenItemId] = useState(null);

    const handleItemClick = (id) => {
        setOpenItemId(openItemId === id ? null : id);
    };



    return (
        <Guest>
            <main>
                <div className="container mt-xl-40">
                    <h2 className={'mb-32'}>Национальные проекты</h2>

                    <div className={'d-flex'}>
                        <div className="nat-projects-text">
                            <p>
                                В мае 2018 года Президент России Владимир Путин подписал Указ <a href="http://www.kremlin.ru/acts/bank/43027">«О национальных целях и
                                стратегических задачах развития Российской Федерации на период до 2024 года»</a>, в котором
                                определены 12 национальных проектов, направленных на обеспечение прорывного
                                научно-технологического и социально-экономического развития России, повышения уровня
                                жизни, создания условий и возможностей для самореализации и раскрытия таланта каждого
                                человека. В целях осуществления прорывного развития Российской Федерации, увеличения
                                численности населения страны, повышения уровня жизни граждан, создания комфортных
                                условий для их проживания указом Президента Российской Федерации в июле 2020 года были
                                определены национальные цели развития страны до 2030 года.
                            </p>
                            <p>
                                «Национальные проекты построены вокруг человека, ради достижения нового качества жизни
                                для всех поколений, которое может быть обеспечено только при динамичном развитии России».
                            </p>
                        </div>
                        <div className="nat-projects-logo">
                            <img src={'/img/pages/natProjects.png'} alt="Нацпроекты Ингушетия"/>
                        </div>
                    </div>
                    {natProjects &&

                        natProjects.map((item) => (
                            <Accordion
                                key={item.id}
                                {...item}
                                title={item.title}
                                image={item.image_main}
                                baseUrl={baseUrl}
                                isOpen={openItemId === item.id}
                                onClick={handleItemClick}
                            />
                        ))

                    }
                </div>
            </main>
        </Guest>
    )
}
