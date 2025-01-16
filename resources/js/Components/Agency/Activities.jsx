import {Link} from "@inertiajs/react";

export default function Activities({activities}) {
    return (
        <section className={'activities'}>
            <div className="container">
                <h2 className={'mt-xl-40 mb-40'}>Деятельность</h2>
                <ul>
                    {activities &&
                        activities.map((activity) => (
                            <li className={'activity-item d-flex align-items-center justify-content-between'}>
                                <h4>
                                    {activity.title}
                                </h4>
                                <img src="../../img/icons/arrow grey.svg" alt=""/>
                            </li>
                        ))
                    }
                </ul>
                <div className="more-news mt-xl-40">
                    <Link className={'d-flex'}>
                        <span>Все виды деятельности</span>
                        <img src="/img/icons/longarrow.svg" alt="" className={'pl-3'}/>
                    </Link>
                </div>
            </div>
        </section>
    )
}
