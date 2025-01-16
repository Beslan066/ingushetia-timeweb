import Guest from "@/Layouts/GuestLayout.jsx";
import {Link, usePage} from "@inertiajs/react";

export default function Home() {

    let {agencies} = usePage().props;
    return (
        <Guest>
            <main>
                <div className="container mt-xl-40">
                    <h2 className={'mb-32'}>Министерства и ведомства</h2>
                        <div className={'agency-items'}>
                            <ul>
                                {agencies.map((agency) => (
                                    <Link href={route('agencies.single', agency.slug)}>
                                        <li className={'agency-item d-flex align-items-center justify-content-between'}>
                                            <div>
                                                <h3>{agency.name}</h3>
                                                {agency &&
                                                    <div className={'d-flex'}>
                                                        {agency.supervisor_type &&
                                                            <span>
                                                            {agency.supervisor_type}:
                                                        </span>
                                                        }
                                                        <span>
                                                         {agency.supervisor.name}
                                                    </span>
                                                    </div>
                                                }
                                            </div>
                                            <div>
                                                <img src="/img/icons/external link.svg" alt=""/>
                                            </div>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                </div>
            </main>
        </Guest>
    )
}
