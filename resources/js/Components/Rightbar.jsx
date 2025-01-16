import {Link} from "@inertiajs/react";
import React from "react";

export default function Rightbar({rightBar}) {
    return (
        <div className={`rightbar ${rightBar ? 'open' : ''}`}>
            <div className=" d-flex justify-content-end">
                <div className="right-menu">
                    <ul className="right-menu-main d-xl-none">
                        <li><Link href="/news">Новости</Link></li>
                        <li><Link href="/region">Регион</Link></li>
                        <li>
                            <button onClick={ e => e.target.classList.toggle('open') }>Органы власти</button>
                            <ul className="submenu">
                                <li><Link href="#">Глава Республики</Link></li>
                                <li><Link href="/pravitelstvo">Правительство</Link></li>
                                <li><Link href="#">Федеральные органы власти</Link></li>
                                <li><Link href={ route('agencies.index') }>Министерства</Link></li>
                            </ul>
                        </li>
                        <li><Link href={ route('media') }>Медиа</Link></li>
                        <li><Link href="">Документы</Link></li>
                        <li><Link href={ route('contacts') }>Контакты</Link></li>
                    </ul>

                    <ul>
                        <Link>
                            <li>
                                Резерв управленческих кадров
                            </li>
                        </Link>
                        <Link>
                            <li>
                                Конкурсы в органах исполнительной власти
                            </li>
                        </Link>
                        <Link>
                            <li>
                                Противодействие коррупции
                            </li>
                        </Link>
                        <Link>
                            <li>
                                Антинаркотическая комиссия
                            </li>
                        </Link>
                        <Link>
                            <li>
                                Поддержка семей военнослужащих
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
