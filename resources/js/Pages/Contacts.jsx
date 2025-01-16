import Guest from "@/Layouts/GuestLayout.jsx";
import Map from "@/Components/Map.jsx";
import {usePage} from "@inertiajs/react";

export default function Contacts() {

    let {contacts} = usePage().props;
    return (
        <Guest>
            <main>
                <div className="container mt-xl-40">
                    <h2 className={'mb-32'}>Контакты</h2>
                    <Map />

                    {contacts &&

                        contacts.map((contact) => (
                            <div className={'contact-items'}>
                                <div className="contact-item-title">
                                    <h2>{contact.title}</h2>
                                </div>
                                <div className={'contact-item'} dangerouslySetInnerHTML={{__html: contact.content}}>

                                </div>
                            </div>

                        ))
                    }
                </div>
            </main>
        </Guest>
    )
}
