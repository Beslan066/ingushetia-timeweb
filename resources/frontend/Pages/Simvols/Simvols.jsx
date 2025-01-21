import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import './simvols.css';
import DocumentsNavigation from "#/molecules/navigation/documents-navigation.jsx";

export default function Simvols() {
  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Государственная символика"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="mb-8 d-flex align-items-center">
            <img src={'img/gerb.jpg'} alt="" style={{marginBottom: '20px'}}/>
            <p>
            <strong>Государственный герб Республики Ингушетия</strong> — официальный символ Республики Ингушетия, в котором отражается вечное стремление народа к свободе и справедливости.
            </p>
            <p>
              Государственный герб Республики Ингушетия представляет собой круг, в центре которого изображен орел с распростертыми крыльями, — символ благородства и мужества, мудрости и верности.
            </p>
            <p>
              В центре герба по вертикальной оси на фоне Кавказских гор расположена боевая башня, символизирующая древнюю и молодую Ингушетию. В левой стороне от башни изображена Столовая гора («Маьт лоам»), в правой — гора Казбек («Башлоам»).
            </p>
            <p>
              Над горами и башней изображен полукруг Солнца, находящегося в зените, от которого исходит вниз семь прямых лучей.
            </p>
            <p>
              В нижней части малого круга изображен солярный знак, символизирующий вечное движение Солнца и Земли, взаимосвязь и бесконечность всего сущего. Три одинаковых луча солярного знака, один из которых находится вертикально, располагаются равномерно по его окружности и направлены против движения часовой стрелки.
            </p>
            <p>
              Между большим и малым кругами надпись: вверху — Республика Ингушетия, внизу — Г1алг1ай Мохк.
            </p>
          </div>

          <div className={'mb-4'} style={{borderBottom: '1px solid #dfdfdf'}}>
            <img src={'img/flag.png'} alt="" style={{width: '200px', height: '140px', marginBottom: '20px'}}/>
            <p>
            <strong>Государственный флаг Республики Ингушетия</strong> — прямоугольное полотнище белого цвета, в центре которого размещен солярный знак в форме красного круга с отходящими от него тремя лучами, каждый из которых оканчивается незавершенным кругом. Отношение ширины флага к его длине — 2:3.
            </p>
            <p>
              По всей длине верхней и нижней части флага имеются две полосы зеленого цвета, каждая из которых шириной в одну шестую ширины флага. Радиус внутреннего круга солярного знака составляет одну одиннадцатую ширины флага. Радиус незавершенного круга на конце лучей солярного знака составляет одну двадцать пятую ширины флага. Ширина полосы, образующей окружность солярного знака, составляет одну одиннадцатую ширины флага. Ширина полосы лучей солярного знака составляет одну двадцатую ширины флага.
            </p>
            <p>
              Один из лучей солярного знака располагается вертикально по отношению к длине флага и находится в верхней части Государственного флага Республики Ингушетия. Расстояние между верхней точкой незавершенного круга на конце лучей и внешним кругом солярного знака составляет одну девятую ширины флага.
            </p>
            <p>
              Лучи располагаются равномерно по всей окружности солярного знака и направлены против движения часовой стрелки.
            </p>
          </div>


          <div className={'mt-2'} style={{backgroundColor: '#b3b3b3', padding: '10px'}}>
            <h3 className={'mb-2 mt-2'}>Выдержки из статьи В. Сапрыкова «Герб и флаг Республики Ингушетия» в журнале«Наука и жизнь»№ 8/1997:</h3>

            <div>
              <p>
                <i>
                Белый цвет, занимающий большую часть полотнища флага, символизирует чистоту помыслов и действий. Зеленый — олицетворяет пробуждение природы, изобилие и плодородие земли Ингушетии, а также выступает как символ ислама, который исповедуют ингуши. Ислам суннитского толка начал распространяться на этой территории с конца XVI века под влиянием Дагестана. Сначала мусульманское учение нашло своих сторонников среди ингушей равнинной части и предгорий. В первой половине XIX века ислам стал господствующей религией у ингушей.
                </i>
              </p>
              <p>
                <i>
                Красный цвет олицетворяет нелегкую многовековую борьбу ингушского народа против несправедливости, за право жить на земле своих предков в мире и согласии с соседними народами.
                </i>
              </p>

              <p>
                <i>
                Солярный знак символизирует вечное движение Солнца и Земли, а также взаимосвязь и бесконечность всего сущего. Дугообразные лучи знака не случайно повернуты против движения часовой стрелки. Именно в таком направлении вращаются Земля и другие планеты вокруг Солнца, равно и Солнце вокруг своей оси. Солярный знак с дугообразными лучами, указывающими на направление вращения в Солнечной системе, является символом благополучия. Таким образом, изображенный на государственном символе солярный знак должен означать бесконечное развитие, ведущее к процветанию народа.
                </i>
              </p>

              <p>
                <i>
                По всей длине верхней и нижней части флага имеются две полосы зеленого цвета, каждая из которых шириной в одну шестую общей ширины флага. Радиус внутреннего круга солярного знака составляет одну шестую ширины флага.
                </i>
              </p>

              <p>
                <i>
                Каждый из трех лучей солярного круга представляет собой полукруг, внутренний радиус которого одна восемнадцатая ширины флага. Ширина полосы, образующей окружность солярного знака и лучей, составляет одну тридцать шестую ширины флага. Лучи располагаются равномерно по всей окружности солярного знака и направлены против движения часовой стрелки.
                </i>
              </p>

              <p>
                <i>
                Одна из центральных фигур герба — орел. Сильная, гордая птица присутствует в гербах четвертой части государств мира. Столь широкое распространение эмблемы орла вполне объяснимо. Почти у всех народов орел символизирует власть, государственную прозорливость. Правда, в разных странах эмблема орла в гербе говорит и об их особых национальных чертах. Присутствие орлов в символах многих мусульманских стран истолковывается как связь с могущественным в свое время арабским халифатом, зародилась и откуда пришла в средние века в Европу соколиная (орлиная) охота.
                </i>
              </p>

              <p>
                <i>
                Другое изображение, расположенное в центре герба, — боевая башня, средневековый архитектурный памятник ингушей и свидетельство о традиционных башенных поселениях в горах. Отдельные башенные постройки стали появляться в XV веке в качестве защитных сооружений от периодических набегов крымских ханов. Они воздвигались у входов в главные ущелья, по предгорьям. Затем возникли целые горские башенные поселения, располагавшиеся на скалистых площадках и каменистых утесах.
                </i>
              </p>

              <p>
                <i>
                Эмблема солнца вообще означает свет, жизнь, богатство, изобилие. Помещенное в зените, оно как бы подчеркивает превосходную степень этих качеств, то есть совершенство, расцвет государства. Эту же идею отражают и семь лучей, исходящих от светила. Семерка издавна считается счастливым числом. Она состоит из тройки и четверки. Три означает единство, почитается многими народами как совершенное число. Четыре, будучи четным, считалось более совершенным, так как делится без остатка на два и в сумме с единицей, двойкой, тройкой составляет 10, которое отражает «завершение полноты», служит символом мирового порядка.
                </i>
              </p>

              <p>
                <i>
                Расположение солнца вверху, свидетельствует, что Ингушетия — солнечный край. Ясное солнце, мир и созидательный труд — заветная мечта граждан республики. С графической точки зрения расположение солнца, башни, солярного знака на одной центральной оси, от которой расходятся крылья могучей птицы и горы, придает гербу определенную композиционную строгость, законченность. Весьма удачно в нижней части герба между внешним и внутренним кругами изображен вайнахский орнамент. Подобные орнаменты получили довольно широкое распрострвно-прикладном искусстве ингушей, и чаще всего они украшали войлочные ковры.
                </i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <AppFooter/>
    </>
  )
}
