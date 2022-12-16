import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {

	const { startDeletingEvent, hasEventSelected } = useCalendarStore()

	const deleteHandle = () => {
		startDeletingEvent()
	}

  return (
    <button
        className="btn btn-danger fab-delete"
				onClick={ deleteHandle }
        style={{
          display: hasEventSelected ? '' : 'none'
        }}
    >
        <i
            className="fas fa-trash-alt "        
        >

        </i>
      
    </button>
  )
}
