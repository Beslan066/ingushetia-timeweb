import {Link} from "@inertiajs/react";

export default function Documents() {
    return (
        <section className="documents mb-32">
            <div className="container d-flex flex-column">
                <h3 className="mb-32">Документы</h3>
                <div className="document-item d-flex justify-content-between w-100 align-items-center">
                    <div>
                        <Link href="">
                            <h4>Отчет Правительства РИ за 2023 год</h4>
                        </Link>
                        <span>Отчеты</span>
                    </div>
                    <img src="/img/icons/arrow grey.svg" alt=""/>
                </div>
                <div className="document-item d-flex justify-content-between w-100 align-items-center">
                    <div>
                        <Link href="">
                            <h4>Постановление Аравительства РИ о повышении пособий</h4>
                        </Link>
                        <span>Акты</span>
                    </div>
                    <img src="/img/icons/arrow grey.svg" alt=""/>
                </div>
                <div className="document-item d-flex justify-content-between w-100 align-items-center">
                    <div>
                        <Link href="">
                            <h4>Республиканский закон №2884 от 19.04.2024</h4>
                        </Link>
                        <span>Законы</span>
                    </div>
                    <img src="/img/icons/arrow grey.svg" alt=""/>
                </div>
                <div className="document-item d-flex justify-content-between w-100 align-items-center">
                    <div>
                        <Link href="">
                            <h4>Отчет правительства за 2022 год</h4>
                        </Link>
                        <span>Отчеты</span>
                    </div>
                    <img src="/img/icons/arrow grey.svg" alt=""/>
                </div>

                <div className="more-news">
                    <Link href="" className={'d-flex align-items-center'}>
                        <span> Все документы</span>
                        <img src="/img/icons/longarrow.svg" alt="" className={'pl-3'}/>
                    </Link>
                </div>
            </div>
        </section>
    )
}
