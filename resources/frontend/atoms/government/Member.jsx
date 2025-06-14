import './member.css';

export default function GovernmentMember({isHead, avatar, name, position, onClick, contact}) {
  const hasAvatar = avatar && !avatar.endsWith('/storage/null');
  const containerStyle = {
    height: !hasAvatar ?'160px' : 'auto',
    backgroundColor: !hasAvatar ? '#f2f2f2' : undefined,
    padding: '10px'
  };

  return (
    <button
      className={`government-team__container government-team--${isHead ? 'head' : 'member'}`}
      onClick={onClick}
      style={containerStyle}
    >
      {hasAvatar &&
      <div className="government-team__avatar">
          <img src={avatar} alt={name} />
      </div>
      }
      <div className="government-team__info">
        <div>
          <h2 className="government-team__title">{name}</h2>
          <div className="government-team__position">{position}</div>
        </div>
        <div className="government-team__contact" style={{marginTop: '8px'}}>
          {contact}
        </div>
      </div>
    </button>
  )
}
