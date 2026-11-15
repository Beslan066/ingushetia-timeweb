import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import BackToTop from "#/atoms/topButton/BackToTop.jsx";
import { Head, useForm, usePage } from "@inertiajs/react";
import '../Region/region.css';
import './survey.css';

const SATISFACTION = [
  'Полностью удовлетворен',
  'Скорее удовлетворен, чем не удовлетворен',
  'Скорее не удовлетворен, чем удовлетворен',
  'Совсем не удовлетворен',
  'Затрудняюсь ответить',
];

const CULTURE_TAX = [
  'Удовлетворен',
  'Скорее удовлетворен, чем не удовлетворен',
  'Не удовлетворен',
];

const EDUCATION = [
  'Начальное', 'Неполное среднее', 'Среднее',
  'Среднее специальное', 'Незаконченное высшее', 'Высшее',
];

const SOCIAL = [
  'Студент', 'Служащий/офисные работники', 'Предприниматель/фермер',
  'Домашняя хозяйка', 'Безработный', 'Пенсионер',
];

const AGES = ['18-24 лет', '25-34 лет', '35-44 лет', '45-59 лет', '60 лет и старше'];

const LOCATIONS = [
  'г. Магас', 'г. Назрань', 'г. Карабулак', 'г. Малгобек', 'г. Сунжа',
  'Назрановский муниципальный район', 'Сунженский муниципальный район',
  'Малгобекский муниципальный район', 'Джейрахский муниципальный район',
];

const TIMEZONE = [
  'Я хочу вернуть сезонные переводы времени (зимнее и летнее время)',
  'Оставить как сейчас и ничего не менять (зимнее время)',
  'Я за перевод на час вперед +1 к МСК (летнее время)',
];

// Универсальный компонент вопроса
function Question({ name, label, options, value, onChange, error }) {
  return (
    <fieldset className="survey__question">
      <legend className="survey__label">{label} <span className="required">*</span></legend>
      <div className="survey__options">
        {options.map(opt => (
          <label key={opt} className="survey__option">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(name, opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {error && <div className="survey__error">{error}</div>}
    </fieldset>
  );
}

export default function SurveyPage() {
  const { props } = usePage();
  const { meta } = props;

  const { data, setData, post, processing, errors } = useForm({
    transport: '',
    roads: '',
    water: '',
    electricity: '',
    gas: '',
    local_admin: '',
    council: '',
    head_admin: '',
    timezone: '',
    culture: '',
    tax: '',
    education: '',
    social_category: '',
    age_group: '',
    location: '',
    gender: '',
  });

  const handleChange = (name, value) => setData(name, value);

  const submit = (e) => {
    e.preventDefault();
    post('/survey');
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={false} />
      <PageTitle title="Социальный опрос населения Ингушетии" />

      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="survey__intro">
            <p>
              Предлагаем Вам принять участие в социологическом исследовании на тему
              «Оценка населением результатов деятельности органов местного самоуправления
              городских округов и муниципальных районов Республики Ингушетия». Ваши ответы,
              как и ответы других участников опроса, в обобщённом виде будут включены в
              Перечень показателей эффективности деятельности органов местного самоуправления
              муниципального района (городского округа).
            </p>
            <p>
              Просим Вас выбрать и отметить позицию, которая совпадает с Вашим мнением.
              Анкета анонимная, мы гарантируем конфиденциальность опроса.
            </p>
          </div>

          <form onSubmit={submit} className="survey__form">
            <Question
              name="transport"
              label="В какой степени Вы удовлетворены организацией транспортного обслуживания в Вашем районе, поселении?"
              options={SATISFACTION}
              value={data.transport}
              onChange={handleChange}
              error={errors.transport}
            />

            <Question
              name="roads"
              label="В какой степени Вы удовлетворены качеством автомобильных дорог Вашего района, поселения?"
              options={SATISFACTION}
              value={data.roads}
              onChange={handleChange}
              error={errors.roads}
            />

            <Question
              name="water"
              label="В какой степени Вы удовлетворены качеством водоснабжения (водоотведения) в Вашем районе, поселении?"
              options={SATISFACTION}
              value={data.water}
              onChange={handleChange}
              error={errors.water}
            />

            <Question
              name="electricity"
              label="В какой степени Вы удовлетворены качеством электроснабжения в Вашем районе, поселении?"
              options={SATISFACTION}
              value={data.electricity}
              onChange={handleChange}
              error={errors.electricity}
            />

            <Question
              name="gas"
              label="В какой степени Вы удовлетворены качеством газоснабжения в Вашем районе, поселении?"
              options={SATISFACTION}
              value={data.gas}
              onChange={handleChange}
              error={errors.gas}
            />

            <Question
              name="local_admin"
              label="В какой степени Вы удовлетворены деятельностью местной администрации Вашего городского округа (муниципального района)?"
              options={SATISFACTION}
              value={data.local_admin}
              onChange={handleChange}
              error={errors.local_admin}
            />

            <Question
              name="council"
              label="В какой степени Вы удовлетворены деятельностью представительного органа (Совета депутатов) Вашего городского округа (муниципального района)?"
              options={SATISFACTION}
              value={data.council}
              onChange={handleChange}
              error={errors.council}
            />

            <Question
              name="head_admin"
              label="В какой степени Вы удовлетворены деятельностью главы местной администрации Вашего городского округа (муниципального района)?"
              options={SATISFACTION}
              value={data.head_admin}
              onChange={handleChange}
              error={errors.head_admin}
            />

            <Question
              name="timezone"
              label="Общественный опрос населения РИ о возврате сезонных переводов времени"
              options={TIMEZONE}
              value={data.timezone}
              onChange={handleChange}
              error={errors.timezone}
            />

            <Question
              name="culture"
              label="В какой степени Вы удовлетворены деятельностью учреждениями культуры?"
              options={CULTURE_TAX}
              value={data.culture}
              onChange={handleChange}
              error={errors.culture}
            />

            <Question
              name="tax"
              label="В какой степени Вы удовлетворены деятельностью налоговых органов?"
              options={CULTURE_TAX}
              value={data.tax}
              onChange={handleChange}
              error={errors.tax}
            />

            <Question
              name="education"
              label="Ваше образование:"
              options={EDUCATION}
              value={data.education}
              onChange={handleChange}
              error={errors.education}
            />

            <Question
              name="social_category"
              label="Ваша социальная категория:"
              options={SOCIAL}
              value={data.social_category}
              onChange={handleChange}
              error={errors.social_category}
            />

            <Question
              name="age_group"
              label="Ваша возрастная группа:"
              options={AGES}
              value={data.age_group}
              onChange={handleChange}
              error={errors.age_group}
            />

            <Question
              name="location"
              label="Ваше место проживания:"
              options={LOCATIONS}
              value={data.location}
              onChange={handleChange}
              error={errors.location}
            />

            <Question
              name="gender"
              label="Ваш пол:"
              options={['Муж.', 'Жен.']}
              value={data.gender}
              onChange={handleChange}
              error={errors.gender}
            />

            <div className="survey__actions">
              <button type="submit" className="survey__submit" disabled={processing}>
                {processing ? 'Отправка…' : 'Голосовать'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <AppFooter />
      <BackToTop />
    </>
  );
}