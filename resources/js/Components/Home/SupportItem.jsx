import React from "react";
import SVOSupportModal from "@/Components/SVOSupportModal.jsx";
import {format, parseISO} from "date-fns";
import {ru} from "date-fns/locale";
import {useEffect} from "react";

export default function SupportItem({title, published, content}) {

    const [modal, setModal] = React.useState(false);
    const formattedDate = format(parseISO(published), 'HH:mm, d MMMM', { locale: ru });

    useEffect(() => {
        if (modal) {
            document.body.classList.add('fixed-body')
        } else {
            document.body.classList.remove('fixed-body')
        }
    });
    return (
        <div>
            <div className={'support-item d-flex align-items-center justify-content-between'} onClick={() => setModal(true)}>
                <p>{title}</p>
                <img src="/img/icons/arrow grey.svg" alt=""/>
            </div>

            <SVOSupportModal
                active={modal}
                onClose={() => setModal(false)}
                title={title}
                content={content    }
            />
        </div>
    )
}
