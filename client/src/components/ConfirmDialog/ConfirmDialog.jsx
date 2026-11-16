import { useEffect, useRef } from 'react'
import { Button } from '../Button/Button.jsx'
import './ConfirmDialog.css'

export function ConfirmDialog({ open, title, busy = false, onClose, onConfirm }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && dialog && !dialog.open) dialog.showModal()
    if (!open && dialog?.open) dialog.close()
  }, [open])

  return (
    <dialog className="confirm-dialog" ref={dialogRef} aria-labelledby="confirm-title" onCancel={(event) => { event.preventDefault(); if (!busy) onClose() }}>
      <h2 id="confirm-title">Eliminar película</h2>
      <p>¿Quieres eliminar «{title}» de la cartelera? Esta acción no se puede deshacer.</p>
      <div className="confirm-dialog__actions"><Button variant="ghost" disabled={busy} onClick={onClose}>Cancelar</Button><Button variant="primary" disabled={busy} onClick={onConfirm}>{busy ? 'Eliminando…' : 'Eliminar'}</Button></div>
    </dialog>
  )
}
