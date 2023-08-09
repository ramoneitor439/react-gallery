import './App.css'
import { NavBar } from './components/navbar/NavBar'
import { Gallery } from './components/gallery/Gallery'
import { useState } from 'react'
import { ImgForm } from './components/img-form/ImgForm'
import { ImageInterface } from './dto/ImageInterface'
import Swal from 'sweetalert2'

function App() {

  let [data, setData] = useState<ImageInterface[]>([])

  let [isToggled, setIsToggled] = useState(false)

  //INSERT
  let [title, setTitle] = useState('')
  let [description, setDescription] = useState('')
  let [img, setImg] = useState<string | null>(null)

  let [isTitleEmpty, setIsTitleEmpty] = useState(false)
  let [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false)
  let [isImgEmpty, setIsImgEmpty] = useState(false)

  // UPDATE
  let [updateId, setUpdateId] = useState(0)
  let [updateTitle, setUpdateTitle] = useState('')
  let [updateDescription, setUpdateDescription] = useState('')
  let [updateImg, setUpdateImg] = useState<string | null>(null)

  let [isUpdateTitleEmpty, setIsUpdateTitleEmpty] = useState(false)
  let [isUpdateDescriptionEmpty, setIsUpdateDescriptionEmpty] = useState(false)
  let [isUpdateImgEmpty, setIsUpdateImgEmpty] = useState(false)

  const toggleForm = () => {
    setIsTitleEmpty(false)
    setIsDescriptionEmpty(false)
    setIsImgEmpty(false)

    let target = document.querySelector(".form-section")
    let target2 = document.querySelector('.update-section')

    if (isToggled) {
      target?.classList.remove("expanded")
      target?.classList.add("contracted")

      target2?.classList.remove("contracted")
      target2?.classList.add("expanded")
    }
    else {
      target?.classList.add("expanded")
      target?.classList.remove("contracted")

      target2?.classList.add("contracted")
      target2?.classList.remove("expanded")
    }

    setIsToggled(!isToggled)
  }

  const onDeleteImage = (id: number) => {
    setUpdateId(0)
    setUpdateTitle("")
    setUpdateDescription("")
    setUpdateImg(null)
    setData(data.filter(img => id != img.id))
  }

  const uploadImage = (e: any) => {

    setIsTitleEmpty(false)
    setIsDescriptionEmpty(false)
    setIsImgEmpty(false)

    if (title == "") {
      setIsTitleEmpty(true)
      return
    }
    if (description == "") {
      setIsDescriptionEmpty(true)
      return
    }

    if (!img) {
      setIsImgEmpty(true)
      return
    }

    e.target.disabled = true
    data.push({
      id: data.length + 1,
      title: title,
      description: description,
      img: img
    })
    e.target.disabled = false
    setTitle("")
    setDescription("")
    setImg(null)
  }

  const onUpdateImageChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const absolutePath = URL.createObjectURL(file)
      setUpdateImg(absolutePath)
    }
  }


  const onUpdateImage = (e: any) => {
    setIsUpdateTitleEmpty(false)
    setIsUpdateDescriptionEmpty(false)
    setIsUpdateImgEmpty(false)

    if (updateTitle == "") {
      setIsUpdateTitleEmpty(true)
      return
    }
    if (updateDescription == "") {
      setIsUpdateDescriptionEmpty(true)
      return
    }

    if (!updateImg) {
      setIsUpdateImgEmpty(true)
      return
    }

    e.target.disabled = true
    setData(data.map(img => {
      if (img.id == updateId) {
        img.title = updateTitle
        img.description = updateDescription
        img.img = updateImg ?? ""

      }
      return img
    }))
    Swal.fire({
      icon: 'success',
      title: 'Completado!',
      text: 'La imagen ha sido editada con éxito!',
    })
    e.target.disabled = false

    setUpdateId(0)
    setUpdateTitle("")
    setUpdateDescription("")
    setUpdateImg(null)

  }

  const selectUpdateImage = (id: number) => {
    data.map(img => {
      if (img.id == id) {
        setUpdateId(img.id)
        setUpdateTitle(img.title)
        setUpdateDescription(img.description)
        setUpdateImg(img.img)

        if (isToggled) {
          toggleForm()
        }
      }
    })
  }

  const onImageChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const absolutePath = URL.createObjectURL(file)
      setImg(absolutePath)
    }
  }

  return (
    <>
      <NavBar />

      <div className='main'>
        <div className='form-section'>
          <ImgForm
            heading='Adicionar imagen'
            title={title}
            description={description}
            img={img}
            onChangeDescription={(e: any) => setDescription(e.target.value)}
            onChangeImg={(e: any) => onImageChange(e)}
            onChangeTitle={(e: any) => setTitle(e.target.value)}
            uploadImage={(e: any) => uploadImage(e)}

            isTitleEmpty={isTitleEmpty}
            isImgEmpty={isImgEmpty}
            isDescriptionEmpty={isDescriptionEmpty}
          />
        </div>
        <div className='gallery-section'>
          <Gallery
            onToggle={toggleForm}
            isToggled={isToggled}
            data={data}
            onDeleteImage={(id: number) => onDeleteImage(id)}
            onUpdateImage={(id: number) => selectUpdateImage(id)}
          />
        </div>
        <div className='update-section'>
          {updateId == 0 ?
            <h1 className='update-empty'>No hay imagen seleccionada</h1>
            :
            <ImgForm
              heading='Editar imagen'
              title={updateTitle}
              description={updateDescription}
              img={updateImg}
              onChangeDescription={(e: any) => setUpdateDescription(e.target.value)}
              onChangeImg={(e: any) => onUpdateImageChange(e)}
              onChangeTitle={(e: any) => setUpdateTitle(e.target.value)}
              uploadImage={(e: any) => onUpdateImage(e)}

              isTitleEmpty={isUpdateTitleEmpty}
              isImgEmpty={isUpdateImgEmpty}
              isDescriptionEmpty={isUpdateDescriptionEmpty}
            />}
        </div>

      </div>
    </>
  )
}

export default App
