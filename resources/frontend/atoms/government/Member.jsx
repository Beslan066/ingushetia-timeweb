import './member.css';

export default function GovernmentMember({isHead, avatar, name, position, onClick}) {

  const hasAvatar = avatar && !avatar.endsWith('/storage/null');

  return (
    <button className={ `government-team__container government-team--${isHead ? 'head' : 'member'}` } onClick={onClick}>
      {hasAvatar &&
        <div className="government-team__avatar">
          <img src={avatar} alt={name}/>
        </div>
      }
      <div className="government-team__info">
        <h2 className="government-team__title">{ name }</h2>
        <div className="government-team__position">{ position }</div>
      </div>
    </button>
  )
}
