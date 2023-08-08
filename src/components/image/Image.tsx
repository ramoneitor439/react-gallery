import React from 'react'
import './Image.css'
import { Edit, Trash } from "tabler-icons-react";
import Swal from "sweetalert2";

interface ImageProps {
    title: string
    description: string
    img: string
    onDeleteImage: () => void
    onUpdateImage: () => void
}

export const Image: React.FC<ImageProps> = ({ title, description, img, onDeleteImage, onUpdateImage }) => {


    const deleteImage = async () => {
        let response = await Swal.fire({
            icon: 'warning',
            title: "Alerta!",
            text: "Está seguro de que desea eliminar la imagen?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No"
        })
        if (response.isConfirmed) {
            onDeleteImage()
        }
    }

    return (
        <>
            <div className="img-container">
                <div className="img-control">
                    <img className="img-source" src={img} alt={title} />
                </div>
                <div className="img-hover">
                    <div className='hover-content'>
                        <h1 className="img-title">{title}</h1>
                        <p className="img-description">{description}</p>
                        <div className="delete-container">
                            <a style={{ cursor: 'pointer' }} onClick={deleteImage} role="button" className="btn-delete" >
                                <Trash
                                    size={15}
                                    color="white"
                                />
                            </a>
                            <a style={{ cursor: 'pointer' }} onClick={onUpdateImage} role="button" className="btn-edit" >
                                <Edit
                                    size={15}
                                    color="white"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}