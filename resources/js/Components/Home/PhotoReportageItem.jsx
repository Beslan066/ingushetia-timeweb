import {Link} from "@inertiajs/react";
import React from 'react'
import GalleryModal from "@/Components/GalleryModal.jsx";

export default function PhotoReportageItem({reportage, baseUrl, formatDate}) {

    const [photoGallery,setPhotoGalleryModal] = React.useState(false);
    const getNumberOfSlides = (reportage) => {
        // Преобразуем JSON-строку в массив
        const slidesArray = JSON.parse(reportage.slides);

        // Возвращаем количество элементов в массиве
        return slidesArray.length;
    };

    const numberOfSlides = getNumberOfSlides(reportage);

    return (
        <div className={'filtered-news-item-block'}>
            <div className="filtered-news-item">
                <div
                    className="news-image position-relative d-flex flex-column align-items-center" onClick={() => setPhotoGalleryModal(true)}>
                    <img src={`${baseUrl}/storage/${reportage.image_main}`} alt={reportage.title}
                         className="w-100 h-100 clean-image" style={{objectFit: 'cover'}}/>
                    <div className={'position-absolute gallery-icon'}>
                        <img src="/img/icons/gallery.svg" alt=""/>
                    </div>
                    <div className={'position-absolute media-count'}>
                        <span>{numberOfSlides} фото</span>

                    </div>
                </div>

                <div className="news-text pl-20 d-flex flex-column justify-content-between">
                    <div>
                        <h4 onClick={() => setPhotoGalleryModal(true)}>{reportage.title.slice(0,71)}</h4>
                    </div>
                    <p className="news-date">{formatDate}
                    </p>
                </div>

            </div>

            <GalleryModal active={photoGallery}
                          title={reportage.title}
                          slides={reportage.slides}
                          reportage={reportage}
                          onClose={() => setPhotoGalleryModal(false)}
            />
        </div>
    )
}
