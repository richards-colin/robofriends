import React, { useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'

const modalElement = document.getElementById('modal-root')

export function Modal({ children, defaultOpened = false }){
    const [isOpen, setIsOpen] = useState(defaultOpened)

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }), [close])

    return createPortal(
        isOpen ? <div className="modal">{children}</div> : null,
        modalElement
    )
}

export default Modal