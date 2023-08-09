import React, { useRef } from 'react'
import { Camera } from 'tabler-icons-react'
import "./ImgForm.css"
import noPicture from "../../assets/no-profile-picture.jpg"

interface AddFormProps {
    heading: string
    title: string
    description: string
    img: string | null

    isTitleEmpty: boolean
    isDescriptionEmpty: boolean
    isImgEmpty: boolean

    onChangeTitle: (e: any) => void
    onChangeDescription: (e: any) => void
    onChangeImg: (e: any) => void

    uploadImage: (e: any) => void
}

export const ImgForm: React.FC<AddFormProps> = ({ heading, title, description, img, isTitleEmpty, isDescriptionEmpty, isImgEmpty,
    onChangeTitle, onChangeDescription, onChangeImg, uploadImage }) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const selectImgage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    return (
        <form className='img-form'>
            <h1 className='img-form-title'>{heading}</h1>
            <div className='form-container'>
                <div className='img-input-container'>
                    <img src={img ?? noPicture} alt="Picture" className='img-form-source' />
                    <button style={{ cursor: 'pointer' }} type='button' onClick={selectImgage} className='btn-picture img-input'>
                        <Camera
                            size={30}
                            color='black'
                        />
                        <span className='img-form-tooltip'>Elegir foto</span>
                    </button>
                    {isImgEmpty && <p className='text-error'>No hay imagen seleccionada</p>}

                    <input ref={fileInputRef} onChange={onChangeImg} type="file" name="img-file" id="img-file" style={{ display: 'none' }} />
                </div>
                <div className='img-input-container'>
                    <label htmlFor="title">Título</label>
                    <input placeholder='Escriba el título aquí...' onChange={onChangeTitle} type="text" name="title" className='img-input' value={title} />
                    {isTitleEmpty && <p className='text-error'>El título está vacío</p>}
                </div>
                <div className='img-input-container'>
                    <label htmlFor="description">Descripción</label>
                    <textarea placeholder='Escriba la descripción aquí...' style={{ resize: 'none' }} onChange={onChangeDescription} name="description" className='img-input img-description' value={description}></textarea>
                    {isDescriptionEmpty && <p className='text-error'>La descripción está vacía</p>}
                </div>
                <div className='img-input-container'>
                    <button style={{ cursor: 'pointer' }} onClick={uploadImage} type="button" className='btn-add'>Completar</button>
                </div>
            </div>
        </form>
    )
}