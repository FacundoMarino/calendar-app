import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModal } from "../store";


export const useUiStore = () => {

 const dispatch = useDispatch();


    const { isDateModalOpen } = useSelector( state => state.ui )

    const openDateModal = () => {

        dispatch( onOpenModal() )

    }

    const closeDateModal = () => {

        dispatch( onCloseModal() )
    }

    return {
        isDateModalOpen,
        openDateModal,
        closeDateModal
    }

}