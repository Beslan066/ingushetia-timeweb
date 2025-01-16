import Map from "@/Components/Map.jsx";
import Guest from "@/Layouts/GuestLayout.jsx";
import {Link, usePage} from "@inertiajs/react";
import Documents from "@/Components/Documents.jsx";
import DownloadIcon from "@/Components/DownloadIcon.jsx";

export default function Implementation() {

    let {implementations} = usePage().props;
    const baseUrl = import.meta.env.VITE_APP_URL;

    return (
        <Guest>
            <main>
                <div className="container mt-xl-40">
                    <h2 className={'mb-32'}>Реализация указов Президента РФ</h2>

                    <div className={'mt-32 implementation-lead'}>
                        <p>В мае 2012 года Президентом Российской Федерации был подписан ряд указов, закрепляющих
                            основные
                            направления развития России в экономике, социальной сфере, внутренней политике,
                            международных
                            делах и вопросах безопасности.
                        </p>
                    </div>

                    <div className="implementation-items">
                        {implementations &&
                            implementations.map((implementation) => (
                                <div className="implementation-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>{implementation.title}</h4>
                                        <p>
                                            <span>{implementation.document_type},</span>
                                            <span>{implementation.document_size}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <a href={`${baseUrl}/storage/${implementation.document_path}`} target={'blank'}>
                                            <DownloadIcon />
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
