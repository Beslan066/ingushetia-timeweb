import React, { useState } from 'react';
import Guest from "@/Layouts/GuestLayout.jsx";
import MediaFilter from "@/Components/Home/MediaFilter.jsx";
import VideoPlayer from "@/Components/Home/VideoPlayer.jsx";
import PhotoReportageItem from "@/Components/Home/PhotoReportageItem.jsx";
import { format, parseISO, isAfter, isBefore } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function Media({ videos, photoReportages }) {
    const [filter, setFilter] = useState('all');
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleDateRangeChange = (newRange) => {
        setDateRange(newRange);
    };

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        const currentYear = new Date().getFullYear();
        const reportYear = date.getFullYear();

        let dateFormat = 'HH:mm, d MMMM';

        // Если год не текущий, добавляем год в форматирование
        if (reportYear !== currentYear) {
            dateFormat += ' yyyy';
        }

        return format(date, dateFormat, { locale: ru });
    };

    const isWithinDateRange = (dateString) => {
        const date = parseISO(dateString);
        const { startDate, endDate } = dateRange;
        const isAfterStart = startDate ? isAfter(date, parseISO(startDate)) : true;
        const isBeforeEnd = endDate ? isBefore(date, parseISO(endDate)) : true;
        return isAfterStart && isBeforeEnd;
    };

    const filteredMedia = () => {
        let filteredVideos = videos;
        let filteredPhotos = photoReportages;

        if (dateRange.startDate || dateRange.endDate) {
            filteredVideos = videos.filter(video => isWithinDateRange(video.published_at));
            filteredPhotos = photoReportages.filter(photo => isWithinDateRange(photo.published_at));
        }

        if (filter === 'video') {
            return filteredVideos.map(video => (
                <VideoPlayer
                    key={video.id}
                    video={video}
                    baseUrl={baseUrl}
                    date={formatDate(video.published_at)}
                />
            ));
        }
        if (filter === 'photo') {
            return filteredPhotos.map(photo => (
                <PhotoReportageItem
                    key={photo.id}
                    video={photo}
                    baseUrl={baseUrl}
                    reportage={photo}
                    formatDate={formatDate(photo.published_at)}
                />
            ));
        }
        // По умолчанию, когда выбран "Все"
        return [
            ...filteredVideos.map(video => (
                <VideoPlayer
                    key={video.id}
                    video={video}
                    baseUrl={baseUrl}
                    date={formatDate(video.published_at)}
                />
            )),
            ...filteredPhotos.map(photo => (
                <PhotoReportageItem
                    key={photo.id}
                    photo={photo}
                    baseUrl={baseUrl}
                    reportage={photo}
                    formatDate={formatDate(photo.published_at)}
                />
            ))
        ];
    };

    const baseUrl = import.meta.env.VITE_APP_URL;

    return (
        <Guest>
            <main>
                <div className="container mt-xl-40">
                    <h2 className="mb-32">Медиа</h2>

                    <div className="media-items-col">
                        <MediaFilter
                            onFilterChange={handleFilterChange}
                            onDateRangeChange={handleDateRangeChange}
                        />

                        <div className="media-items d-flex flex-wrap">
                            {filteredMedia()}
                        </div>
                    </div>
                </div>
            </main>
        </Guest>
    );
}
