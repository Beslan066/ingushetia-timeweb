import React from "react";
import './member-content.css'

export default function MemberContent({ name, position, avatar, content, contacts }) {
  return (
    <div className="member-content">
      <div className="member__body-wrapper">
        <div className="member-modal__body">
          <div className="member__header">
            <h2 className="member__title">{ name }</h2>
            <div className="member__position">{ position }</div>
            <div className="member__image">
              <img src={ `${ avatar }` } alt=""/>
            </div>
          </div>
          <div className="content">
            <div dangerouslySetInnerHTML={ { __html: content } }></div>
          </div>
          <hr/>
          <div className="member__contacts">
            {
              contacts && contacts.map((contact) => (
                <div className="contact-item" key={ contact.title }>
                  <div className="contact__title">{ contact.title }</div>
                  <div className="contact__value">{ contact.value }</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
