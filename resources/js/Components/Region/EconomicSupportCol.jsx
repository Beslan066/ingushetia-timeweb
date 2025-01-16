import EconomicSupportModal from "@/Components/Home/EconomicSupportModal.jsx";
import {format, parseISO} from "date-fns";
import React from "react";
import {ru} from "date-fns/locale";
import {useEffect} from "react";




export default function EconomicSupportCol({title, lead, baseUrl, content, published}) {


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
            <div className="col economic-support-card" onClick={() => setModal(true)}>
                <h4>{title}</h4>
                <span>{lead}</span>


            </div>

            <EconomicSupportModal
                title={title}
                lead={lead}
                content={content}
                baseUrl={baseUrl}
                active={modal}
                onClose={() => setModal(false)}
            />
        </div>
    )
}
