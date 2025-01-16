import _ from 'lodash';
import './pages.css';

export default function SlidePagination({ count, current, onSlide }) {
  const items = _.range(0, count);

  return (
    <div className="slider__pages">
      {
        items.map((index) => {
          return (
            <button key={ index }
                    className={ `slider__page ${ current === index ? 'slider__page--active' : '' }` }
                    disabled={ current === index }
                    onClick={ () => onSlide(index) }
            ></button>
          )
        })
      }
    </div>
  )
}
