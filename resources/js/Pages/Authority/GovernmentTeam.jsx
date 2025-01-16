import {Link} from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout.jsx";
import React from 'react'
import PersonModal from "@/Components/PersonModal.jsx";


export default function GovernmentTeam() {
    const [modal,setModal] = React.useState(false);
    return(
        <Guest>
            <main className="mt-xl-40">
                <div className="container">
                    <h2 className={'mb-32'}>Состав правительства</h2>
                </div>
                <div className="container d-flex flex-column gap-4 flex-xl-row w-full  col-xxl-12 goverment-team-page">
                    <div className="main-left col-xxl-9">
                        <div className="government-head d-flex w-100 mb-32">
                            <div className="government-img">
                                <img src="../../img/man.png" alt=""/>
                            </div>
                            <div className="government-text">
                                <h2 onClick={() => setModal(true)}>Сластенин Владимир Владимирович</h2>
                                <span>Председатель Правительства Республики Ингушетия</span>
                            </div>
                        </div>

                        <div className="government-team d-flex justify-content-between   flex-wrap ">
                            <div className="government-man">
                                <div className="government-img">
                                    <img src="../../img/man.png" alt=""/>
                                </div>
                                <div className="government-text">
                                    <h3>Евлоев Магомед Мусаевич</h3>
                                    <span>Первый заместитель Председателя Правительства Республики Ингушетия</span>
                                </div>
                            </div>
                            <div className="government-man">
                                <div className="government-img">
                                    <img src="../../img/man.png" alt=""/>
                                </div>
                                <div className="government-text">
                                    <h3>Фурсов Олег Борисович</h3>
                                    <span>Первый заместитель Председателя Правительства Республики Ингушетия</span>
                                </div>
                            </div>
                            <div className="government-man">
                                <div className="government-img">
                                    <img src="../../img/man.png" alt=""/>
                                </div>
                                <div className="government-text">
                                    <h3>Фаттахов Тимур Наильевич</h3>
                                    <span>Заместитель Председателя Правительства Республики Ингушетия</span>
                                </div>
                            </div>
                            <div className="government-man">
                                <div className="government-img">
                                    <img src="../../img/man.png" alt=""/>
                                </div>
                                <div className="government-text">
                                    <h3>Сагова Индира Муратовна</h3>
                                    <span>Первый заместитель Председателя Правительства Республики Ингушетия</span>
                                </div>
                            </div>
                            <div className="government-man">
                                <div className="government-img">
                                    <img src="../../img/man.png" alt=""/>
                                </div>
                                <div className="government-text">
                                    <h3>Хаутиев Заурбек Саварбекович</h3>
                                    <span>Председатель Комитета государственного заказа Республики Ингушетия</span>
                                </div>
                            </div>
                            <div className="government-man">
                                <div className="government-img">
                                    <img src="../../img/man.png" alt=""/>
                                </div>
                                <div className="government-text">
                                    <h3>Тамбиев Руслан Абоязитович</h3>
                                    <span>Начальник Управления делами Главы и Правительства Республики Ингушетия</span>
                                </div>
                            </div>
                            <div className="government-man">
                                <div className="government-img">
                                    <img src="../../img/man.png" alt=""/>
                                </div>
                                <div className="government-text">
                                    <h3>Мальсагов Адам Абукарович</h3>
                                    <span>Министр молодёжной политики и туризма</span>
                                </div>
                            </div>
                            <div className="government-man">
                                <div className="government-img">
                                    <img src="../../img/man.png" alt=""/>
                                </div>
                                <div className="government-text">
                                    <h3>Балахоев Микаил Алаудинович</h3>
                                    <span>Министр строительства Республики Ингушетия</span>
                                </div>
                            </div>
                            <div className="government-man">
                                <div className="government-img">
                                    <img src="../../img/man.png" alt=""/>
                                </div>
                                <div className="government-text">
                                    <h3>Муталиев Хаджибекир Тимурланович</h3>
                                    <span>Министр труда, занятости и социального развития Республики Ингушетия</span>
                                </div>
                            </div>
                            <div className="government-man">
                                <div className="government-img">
                                    <img src="../../img/man.png" alt=""/>
                                </div>
                                <div className="government-text">
                                    <h3>Гагиев Магомед Курейшевич</h3>
                                    <span>Министр сельского хозяйства и продовольствия Республики Ингушетия</span>
                                </div>
                            </div>
                            <div className="government-man">
                                <div className="government-img">
                                    <img src="../../img/man.png" alt=""/>
                                </div>
                                <div className="government-text">
                                    <h3>Мизиев Руслан Илезович</h3>
                                    <span>Министр по внешним связям, национальной политике, печати и информации Республики Ингушетия</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="main-right ">
                        <div className="d-flex flex-column mb-32 region-links">
                            <ul className="region-pager">
                                <li><Link href="/pravitelstvo">Правительство</Link></li>
                                <li className="active"><Link href="">Аппарат правительства</Link></li>
                                <li><Link href="">Проектная деятельность</Link></li>
                                <li><Link href="">Органы исполнительной власти</Link></li>
                                <li><Link href="">Государственная служба</Link></li>
                                <li><Link href="">Противодействие коррупции</Link></li>
                                <li><Link href="">Противодействие терроризму</Link></li>
                                <li><Link href="">Открытые данные</Link></li>
                                <li><Link href="">Открытое  Правительство</Link></li>
                                <li><Link href="">Контрольно-надзорная деятельность</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <PersonModal active={modal} onClose={() => setModal(false)}/>
        </Guest>
    )
}
