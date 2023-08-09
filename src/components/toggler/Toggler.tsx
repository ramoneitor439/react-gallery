import React from "react"
import { Edit, Plus } from "tabler-icons-react"
import './Toggler.css'

interface TogglerProps {
    onToggle: any
    isToggled: any
}

export const Toggler: React.FC<TogglerProps> = ({ onToggle, isToggled }) => {

    let expand = (
        <>
            <Plus
                color="white"
                size={45}
            />
            <span className='toggler-tooltip'>Adicionar</span>
        </>
    )
    let contract = (
        <>
            <Edit
                color="white"
                size={45}
            />
            <span className='toggler-tooltip'>Editar</span>
        </>
    )

    return (
        <a style={{ cursor: 'pointer' }} onClick={onToggle} className="form-toggler" role="button">
            {isToggled ? contract : expand}
        </a>
    )
}