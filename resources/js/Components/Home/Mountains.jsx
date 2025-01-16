import React, { useState } from 'react';
import MountainModal from "@/Components/Home/MountainModal.jsx";

export default function Mountains({ mountains, baseUrl }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedMountain, setSelectedMountain] = useState(null);

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % mountains.length);
    };

    const handlePrevious = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + mountains.length) % mountains.length);
    };

    const openMountainModal = (mountain) => {
        setSelectedMountain(mountain);
    };

    const closeMountainModal = () => {
        setSelectedMountain(null);
    };

    return (
        <section className={'mb-32'}>
            <div className="container">
                <h2 className={'mt-xl-40 mb-32'}>Родина башен</h2>

                <div className={'mountain-slider'}>
                    <div
                        className={'mountain-items d-flex'}
                        style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.3s ease-in-out' }}
                    >
                        {mountains.map((mountain, index) => (
                            <div key={index} className="mountain-item" onClick={() => openMountainModal(mountain)}>
                                <div className="mountain-image">
                                    <img src={`${baseUrl}/storage/${mountain.image_main}`} alt=""/>
                                </div>
                                <div className="mountain-text">
                                    <div>
                                        <h2>{ mountain.title }</h2>
                                        <p>{ mountain.lead }</p>
                                    </div>
                                    <button className={ 'more' }>
                                    Подробнее <img src="/img/icons/longarrow.svg" alt=""/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="resource-arrows d-flex align-items-center" style={{marginTop: '20px'}}>
                    <button onClick={handlePrevious} style={{marginRight: '20px'}}>
                        <img src="/img/icons/arrow back.svg" alt=""/>
                    </button>
                    <div className={'page-counter'}>
                        <span>{currentSlide + 1}</span>
                        <span>/</span>
                        <span>{mountains.length}</span>
                    </div>
                    <button className={'pl-20'} onClick={handleNext}>
                        <img src="/img/icons/arrow next .svg" alt=""/>
                    </button>
                </div>

                {selectedMountain && (
                    <MountainModal
                        title={selectedMountain.title}
                        image={selectedMountain.image_main}
                        content={selectedMountain.content}
                        imageAuthor={selectedMountain.image_author}
                        imageDescription={selectedMountain.image_description}
                        active={Boolean(selectedMountain)}
                        onClose={closeMountainModal}
                    />
                )}
            </div>
        </section>
    );
}
