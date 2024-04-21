const Avatar = ({big, url}) => {
    return (
        <div className={`${big ? ' w-36 h-36' : 'w-14'} h-14 overflow-hidden rounded-full`}>
            <img className="object-cover w-full h-full" src={url} alt="Avatar"></img>
        </div>
    )
};

export default Avatar;