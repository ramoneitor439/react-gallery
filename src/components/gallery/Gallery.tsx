import { Image } from "../image/Image"
import React from "react"
import { Toggler } from "../toggler/Toggler"
import './Gallery.css'
import { ImageInterface } from "../../dto/ImageInterface"

interface GalleryProps {
    onToggle: any
    isToggled: boolean
    data: ImageInterface[]
    onDeleteImage: (id: number) => void
    onUpdateImage: (id: number) => void
}

export const Gallery: React.FC<GalleryProps> = ({ onToggle, isToggled, data, onDeleteImage, onUpdateImage }) => {

    let pictures = data ? data.map(img => {
        return (
            <li className="img-item" key={img.id}>
                <Image
                    title={img.title}
                    description={img.description}
                    img={img.img}
                    onDeleteImage={() => onDeleteImage(img.id)}
                    onUpdateImage={() => onUpdateImage(img.id)}
                />
            </li>
        )
    }) : []

    return (
        <>
            {data.length > 0 ? (
                <ul className="img-list">
                    {pictures}
                </ul>
            ) : (
                <div className="gallery-empty-container"><h1 className="gallery-empty-text">Galería vacía</h1></div>
            )}
            <Toggler onToggle={onToggle} isToggled={isToggled} />
        </>
    )
}

