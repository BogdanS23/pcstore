import "../styles/MainCard.css"

export const MainCard = ({ title, imageSrc, imageAlt }) => {
    return(
        <>
            <div className="card">
                <div className="card-content">
                    <h2 className="card-title">{title}</h2>
                    <div className="card-image-wrapper">
                        <img
                        loading="lazy"
                        src={imageSrc}
                        alt={imageAlt}
                        className="card-image"
                        />
                    </div>
                </div>              
            </div>
        </>
    )
}