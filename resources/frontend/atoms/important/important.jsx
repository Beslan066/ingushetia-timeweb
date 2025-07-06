import { Link } from "@inertiajs/react";
import './important.css';

export default function Important() {
  return (
    <div className="important">
      <h2 className="important__title">Важное</h2>
      <div className="important__items">
        <Link href="/nation-projects" className="important__link">Нац. проекты</Link>
        <Link href="/military-support" className="important__link">Поддержка семей участников СВО</Link>
        <Link href="/implementations" className="important__link">Указы Президента РФ</Link>
        {/*<Link href="/economic-support" className="important__link">Поддержка экономики и граждан</Link>*/}
        <Link href="/anticorruptions" className="important__link">Противодействие коррупции</Link>
      </div>
    </div>
  )
}
