
import { Link } from '@inertiajs/react';
import "../../../../public/css/region.css";
import React from 'react'
import Guest from "@/Layouts/GuestLayout.jsx";


export default function Economic() {
    return (
        <Guest>
            <main className="mt-xl-40">
                <div className="container">
                    <h2 className="mb-32">Экономика Ингушетии</h2>
                </div>
                <div className="container d-flex flex-column gap-4 flex-xl-row w-full  col-xxl-12 economic-page">
                    <div className="main-left col-xxl-9">
                        <div className="page-head d-flex flex-column">
                            <p>
                                Становление Республики Ингушетия, как самостоятельного субъекта, начиная с 1992 года,
                                совпало с периодом перехода Российской Федерации
                                на рыночные отношения. Несмотря на все трудности,
                                возникшие перед молодой республикой, руководству удалось добиться положительных
                                результатов в различных направлениях экономической и социальной сферы.
                            </p>

                            <p>Инвесторы начали проявлять интерес к экономике Республики Ингушетия. И у нас есть все
                                необходимое, чтобы добиться более высоких результатов.
                                Богатая минерально-сырьевая база,
                                благоприятные климатические условия, выгодное географическое положение.
                            </p>
                            <p>
                                Ингушетия расположена на склонах Большого Кавказского хребта в зоне благоприятных
                                климатических условий. Сырьевая база республики представлена месторождениями
                                нефти и газа, мраморных известняков, доломитов, нерудных строительных материалов и
                                кирпичных глин высокого качества, минеральных и родниковых вод. Важный
                                природный ресурс Ингушетии-леса. Они занимают 140 тыс. га, в основном смешанные
                                широколиственные, включающие ценные породы деревьев (бук, дуб, чинар и др.).
                                Общий запас древесины составляет около 11 млн. м3. Почвы республики черноземные,
                                плодородные. Климат континентальный. Природно-климатические условия благоприятны для
                                развития сельского хозяйства.
                                Республика располагает значительным гидроэнергетическим потенциалом, величина которого
                                по предварительным расчетам составляет около 1,5 млрд. кВт/ч.
                            </p>
                        </div>

                        <div className="economic-table w-100">
                            <table className="w-100">
                                <thead>
                                <tr>
                                    <th>Виды экономической деятельности</th>
                                    <th>2019 год</th>
                                    <th>2020 год</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>ВРП</td>
                                    <td>100,0</td>
                                    <td>100,0</td>
                                </tr>
                                <tr>
                                    <td>Сельское, лесное хозяйство, охота, рыболовство и рыбоводство</td>
                                    <td>2,7</td>
                                    <td>3,1</td>
                                </tr>
                                <tr>
                                    <td>Добыча полезных ископаемых</td>
                                    <td>0,2</td>
                                    <td>0,2</td>
                                </tr>
                                <tr>
                                    <td>Обрабатывающие производства</td>
                                    <td>18,5</td>
                                    <td>20,8</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <p>
                                Первостепенными задачами инвестиционной политики руководства республики являются
                                снижение инвестиционных рисков, совершенствование системы правового регулирования по
                                защите прав инвесторов, создание оптимальных условий для вложения отечественного и
                                зарубежного капитала в приоритетные отрасли экономики за счет предоставления
                                государственной поддержки по наиболее эффективным инвестиционным проектам.
                            </p>
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
