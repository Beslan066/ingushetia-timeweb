export default function Map() {
    return (
        <div className="page-head d-flex flex-column w-100">
            <div style={{position: 'relative'}} className="w-100">
                <a href="https://yandex.ru/maps?utm_medium=mapframe&utm_source=maps"
                   style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '0px'}}>Яндекс Карты</a>
                <a href="https://yandex.ru/maps/?ll=45.143586%2C43.116569&utm_medium=mapframe&utm_source=maps&z=9.78"
                   style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '14px'}}>Яндекс Карты</a>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=44.836479%2C43.116569&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzAwMDA2MRI10KDQvtGB0YHQuNGPLCDQoNC10YHQv9GD0LHQu9C40LrQsCDQmNC90LPRg9GI0LXRgtC40Y8iCg3mNzRCFRRqLEI%2C&z=9.78"
                    frameBorder="1" allowFullScreen="true" style={{position: 'relative'}}></iframe>
            </div>
        </div>
    )
}
