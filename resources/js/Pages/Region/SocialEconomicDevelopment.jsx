import {Link, usePage} from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout.jsx";
import DownloadIcon from "@/Components/DownloadIcon.jsx";

export default function  SocialEconomicDevelopment() {

    let {socialEconomicDevelopment} = usePage().props;
    const baseUrl = import.meta.env.VITE_APP_URL;


    return (
        <Guest>
            <main className="mt-xl-40">
                <div className="container">
                    <h2 className="mb-32">Социально-экономическое развитие</h2>
                </div>
                <div className="container d-flex flex-column gap-4 flex-xl-row w-full  col-xxl-12 economic-page">
                    <div className="main-left col-xxl-9">
                        <div className="page-head d-flex flex-column">
                            <p>
                                Стратегия социально-экономического развития Республики Ингушетия на долгосрочную перспективу
                            </p>
                        </div>

                        <div className="implementation-items">
                            {socialEconomicDevelopment &&
                                socialEconomicDevelopment.map((item) => (
                                    <div
                                        className="implementation-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4>{item.title}</h4>
                                            <p>
                                                <span>{item.document_type},</span>
                                                <span>{item.document_size}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <a href={`${baseUrl}/storage/${item.document_path}`}
                                               target={'blank'}>
                                                <DownloadIcon/>
                                            </a>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="main-right">
                        <div className="d-flex flex-column mb-32 region-links">
                            <ul className="region-pager">
                                <li><Link href="/region">О Республике</Link></li>
                                <li><Link href="/history">История</Link></li>
                                <li className="active"><Link href="">Экономика</Link></li>
                                <li><Link href="/municipality">Муниципальные образования</Link></li>
                                <li><Link href={route('socialEconomicDevelopment')}>Социально-экономическое
                                    развитие</Link></li>
                                <li><Link href="">Реализация стратегических инициатив Президента РФ</Link></li>
                                <li><Link href="/economic-support">Поддержка экономики и граждан</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </Guest>
    )
}
