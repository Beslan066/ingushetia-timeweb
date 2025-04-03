import Guest from "@/Layouts/GuestLayout.jsx";
import {usePage} from "@inertiajs/react";
import SupportItem from "@/Components/Home/SupportItem.jsx";

export default function SVOSupport() {

    let {supports} = usePage().props;
    return (
        <Guest>
            <main>
                <div className="container mt-xl-40">
                    <h2 className={'mb-32'}>
                        Поддержка семей военнослужащих
                    </h2>
                    <div className={'svo-support-text'}>
                        <p>
                            В Республике Ингушетия разработан комплекс мер социальной поддержки семей военнослужащих.
                        </p>
                        <p>Филиал государственного фонда «Защитники Отечества»: здесь участники СВО и члены их семей в
                            режиме «одного окна» могут получить все меры социальной поддержки и услуги, в т.ч. бесплатные
                            юридические консультации, психологическую помощь, направление на реабилитацию, помощь в
                            трудоустройстве и пр.
                        </p>

                        <p>
                            Обратиться в фонд можно:
                        </p>

                        <ul>
                            <li>Лично по адресу: г. .</li>
                            <li>По телефону 8****.</li>
                            <li>Написать на почту .</li>
                            <li>Во всех городах и районах региона работают социальные координаторы фонда – к ним можно
                                обратиться через территориальные органы соцзащиты.
                            </li>
                        </ul>

                        <p>
                            По всем вопросам, касающимся помощи участникам СВО и их семьям, можно обращаться на
                            «горячую линию» Центра социального сопровождения семей участников спецоперации
                            (режим работы пн-пт с 09:00 до 18:00).
                        </p>
                    </div>

                    <div className="support-items">
                        {supports &&
                            supports.map((support) => (
                                <SupportItem
                                    title={support.title}
                                    content={support.content}
                                    published={support.created_at}
                                />
                            ))
                        }
                    </div>
                </div>
            </main>
        </Guest>
    )
}
