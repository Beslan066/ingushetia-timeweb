import React, { useEffect } from "react";
import { Link } from '@inertiajs/react';
import 'bootstrap/dist/css/bootstrap.css';
import "../../../public/css/globals.css";
import "../../../public/css/region.css";
import Search from "@/Components/Home/Search.jsx";
import SupportButton from "@/Components/SupportButton.jsx";
import SupportModal from "@/Components/SupportModal.jsx";
import Rightbar from "@/Components/Rightbar.jsx";
import Logo100 from "@/Components/Logo100.jsx";
import ReturnSvg from "@/Components/ReturnSvg.jsx";
export default function Guest({ children, agency, baseUrl }) {
    const [search, setSearch] = React.useState(false);
    const [supportModal, setSupportModal] = React.useState(false);
    const [rightBar, setRightBar] = React.useState(false);

    const handleSearchClick = () => {
        setSearch(prevSearch => !prevSearch);
    };

    const handleRightBarToggle = () => {
        setRightBar(prevRightBar => !prevRightBar);
    };


    useEffect(() => {
        if (rightBar) {
            document.body.classList.add('rightbar-open');
        } else {
            document.body.classList.remove('rightbar-open');
            setRightBar(false); }
    }, [rightBar]);


    return (
        <div className={'position-relative'}>
            <div className={'top-header'}>
                <Link>
                    <div className="container d-flex justify-content-center">
                        <div className={'d-flex align-items-center'}>
                            <ReturnSvg />
                            <span>
                                Вернуться на портал Администрации РИ
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
            <header className={`fixed-header`}>
            <div className="container p-16 d-flex justify-content-between align-items-center">
                    <div className="logo d-flex align-items-center">
                        <img src={`${baseUrl}/storage/${agency.logo}`} alt=""/>
                        <Link href={'/'}>
                            <div>
                                <h1 className="main-title">{agency.full_title}</h1>
                                <p className="main-desc">Официальный портал</p>
                            </div>
                        </Link>
                    </div>
                    <nav className="header-menu">
                        <ul className="d-flex align-items-center topmenu">
                            <li><Link href={'news'}>Новости</Link></li>
                            <li><Link href={'agencies'}>Деятельность</Link></li>
                            <li><Link href="">Медиа</Link></li>
                            <li><Link href="">Документы</Link></li>
                            <li><Link href={route('contacts')}>Контакты</Link></li>
                            <div className="d-flex">
                                {!rightBar &&
                                    <li style={{cursor: 'pointer'}} className="menu-icons" onClick={handleSearchClick}>
                                        <img src={`img/icons/${search ? 'Close' : 'search'}.svg`} alt="Close"/>
                                    </li>
                                }

                                <li className="menu-icons">
                                    <button style={{border: 'none'}} onClick={handleRightBarToggle}>
                                        <img src={`img/icons/${rightBar ? 'Close' : 'burger'}.svg`} alt="Menu"/>
                                    </button>
                                </li>
                            </div>
                        </ul>
                    </nav>
                </div>
            </header>

            <Rightbar rightBar={rightBar}/>

            <Search search={search}/>
            {children}

            <footer>
                <div className="container p-32">
                    <div className="d-flex justify-content-between mb-32" style={{borderBottom: '2px solid #6C6C6C'}}>
                        {/* ваш код */}
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                        <div className="logo d-flex align-items-center">
                            <img src={'/img/logo.svg'} alt="" className="mr-12"/>
                            <div>
                                <h2 className="main-title">Республика Ингушетия</h2>
                                <p className="main-desc">ОФициальный портал</p>
                            </div>
                        </div>
                        <div onClick={() => setSupportModal(true)}>
                            <SupportButton/>
                        </div>
                    </div>
                </div>
            </footer>

            <SupportModal active={supportModal} onClose={() => setSupportModal(false)}/>
        </div>
    );
}

