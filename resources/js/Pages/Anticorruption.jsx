import {usePage} from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout.jsx";
import DownloadIcon from "@/Components/DownloadIcon.jsx";

export default function Anticorruption() {
    let {anticorruptions} = usePage().props;
    const baseUrl = import.meta.env.VITE_APP_URL;

    return (
        <Guest>
            <main>
                <div className="container mt-xl-40">
                    <h2 className={'mb-32'}>Противодействие коррупции</h2>

                    <div className={'mt-32 anticorruption-lead'}>
                        <p><strong>Коррупция</strong> – злоупотребление служебным положением, дача взятки, получение взятки,
                            злоупотребление
                            полномочиями, коммерческий подкуп либо иное незаконное использование физическим лицом своего
                            должностного положения вопреки законным интересам общества и государства в целях получения
                            выгоды в виде денег, ценностей, иного имущества или услуг имущественного характера, иных
                            имущественных прав для себя или для третьих лиц либо незаконное предоставление такой выгоды
                            указанному лицу другими физическими лицами.
                        </p>

                        <p className={'mt-4'}>Сообщения о фактах коррупции можно оставлять по «телефону доверия» Главы Республики Ингушетия
                            <a className={'ml-2'} href="tel:(4932) 41-14-44">(4932) 41-14-44</a>, а также направлять по электронной почте <a href="mailto:anticorruption@ingushetia.ru">anticorruption@ingushetia.ru</a>.
                        </p>

                        </div>


                    <div className="implementation-items mt-xl-40">
                        {anticorruptions &&
                            anticorruptions.map((anticorruption) => (
                                <div className="implementation-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>{anticorruption.title}</h4>
                                    </div>
                                    <div>
                                        <a href={`${baseUrl}/storage/${anticorruption.document}`} target={'blank'}>
                                            <DownloadIcon/>
                                        </a>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </main>
        </Guest>
    )
}
