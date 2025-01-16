import "../../../public/css/modal.css";
import React from "react";
import {Link} from "@inertiajs/react";
export default function Modal({ active, onClose, title, image, content, category, date, reportages, categoryId, relatedPosts, imageAuthor, imageDesc }) {

    const baseUrl = import.meta.env.VITE_APP_URL;


    return (
        <div>
            <div className={`d-flex justify-content-center modal-section`}>
                <div className={`main-modal p-xl-32 ${active ? 'active' : ''}`} id="mainModal">
                    <div className="modal-head w-100 d-flex align-items-center justify-content-between mb-32">
                        <p className="d-flex align-items-center gap-2">
                            <a href="">Главная </a>
                            <span className=""><img className={'next-icon'} src="../../img/icons/no.svg"
                                                         alt=""/></span>
                            <a className="" href="">Новости </a>
                            <span className="news-title-breadcrumb"><img className={'next-icon'} src="../../img/icons/no.svg"
                                                         alt=""/></span>
                            <a className="news-title-breadcrumb" href="">{title}</a>
                        </p>
                        <div className="flex-shrink-0 align-self-start">
                            <button className="mr-12"><img src="/img/icons/Print.png" alt=""/></button>
                            <button onClick={onClose}><img src="/img/icons/Close.png" alt=""/></button>
                        </div>
                    </div>

                    <div className="modal-news-content mt-xl-40 mb-24">
                        <div className="modal-news-date d-flex align-items-center">
                            <p className="news-date text-black mb-4">{date}
                                {categoryId && (
                                    <Link href={route('posts.by.tag', {categoryId: categoryId})}>
                                        <span className="news-category">{category}</span>
                                    </Link>
                                )}
                            </p>

                        </div>

                        <div className="modal-news-title">
                            <h2>{title}</h2>
                        </div>

                        <div className="modal-news-image d-flex flex-column">
                            <img className="w-100" src={`${baseUrl}/storage/${image}`} alt=""/>
                            <div className="image-info d-flex align-items-center justify-content-between mt-2">
                                <p className="image-author">
                                    {imageAuthor &&
                                        imageAuthor
                                    }
                                </p>
                                <p className="image-desc">
                                    {imageDesc &&
                                        imageDesc
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="modal-news-text mt-32" dangerouslySetInnerHTML={{__html: content}}>

                        </div>


                    </div>

                    {reportages &&
                        <div className="modal-gallery d-flex flex-wrap mb-24">
                            {reportages.map((reportage, index) => (
                                <img key={index} src={`${baseUrl}/storage/${reportage}`}
                                     alt={`Slide ${index + 1}`}/>
                            ))}
                        </div>
                    }


                    <div className="modal-tags d-flex flex-column mb-24">
                        <span className="mb-2">Теги:</span>
                        <div className="tags d-flex align-items-center flex-wrap mb-24 gap-2">
                            <a href="" type="button">Спорт</a>
                            <a href="" type="button">Новые проекты</a>
                            <a href="" type="button">Калиматов</a>
                            <a href="" type="button">Гамурзиево</a>
                        </div>

                        <span className="mb-2">Поделиться:</span>
                        <div className="share-buttons d-flex align-items-center flex-wrap gap-2">
                            <a href="" type="button"><img src="/img/icons/social/telegram (1).png" alt=""/></a>
                            <a href="" type="button"><img src="/img/icons/social/VK.png" alt=""/></a>
                            <a href="" type="button"><img src="/img/icons/social/ok.png" alt=""/></a>
                            <a href="" type="button"><img src="/img/icons/social/Whatsapp.png" alt=""/></a>
                            <a href="" type="button"><img src="/img/icons/social/Link.png" alt=""/></a>
                        </div>
                    </div>

                    <div className="see-also d-flex flex-column">
                    <h3 className="mb-24">Смотрите также</h3>
                        <div className="agency-news">
                            {relatedPosts && relatedPosts.map((post, index) => (
                                <div key={index} className="filtered-news-item">
                                    <div className="news-image">
                                        <img className="w-100" style={{objectFit: 'cover'}} src={`${baseUrl}/storage/${post.image_main}`}
                                             alt={post.title}/>
                                    </div>
                                    <div className="news-text p-25 mt-4">
                                        <a href={`/posts/${post.id}`}>
                                            <h4>{post.title}</h4>
                                        </a>
                                        <p className="news-date">{date}
                                            <span className="news-category ml-4">{post.category.title}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
