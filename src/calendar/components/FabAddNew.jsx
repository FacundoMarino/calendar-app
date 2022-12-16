import { addHours } from "date-fns"
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

	const { openDateModal } = useUiStore()
	const { onSetActiveEvent } = useCalendarStore()

	const clickHandle = () => {
		onSetActiveEvent({

			title: '',
			notes: '',
			start: new Date(),
			end: addHours( new Date(), 2 ),
			bgColor: '#fafafa',
			user: {
				_id: '123',
				name: 'Facundo'
			}
		});

		openDateModal()
	}


  return (
    <button
        className="btn btn-primary fab"
				onClick={ clickHandle }
    >
        <i
            className="fas fa-plus "        
        >

        </i>
      
    </button>
  )
}
