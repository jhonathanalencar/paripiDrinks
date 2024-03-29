import { createContext, ReactNode, useEffect, useReducer } from "react";
import { Actions, Card, Cocktail, ErrorType, reducer, StateType } from "../utils/reducer";
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

interface CartContextProviderProps{
  children: ReactNode;
}

interface CartContextData{
  state: StateType;
  getAllCocktails: () => void
  getTotal: () => void
  toggleModal: () => void
  addItemToCart: (item: Cocktail) => void
  removeItemFromCart: (id: string) => void
  clearCart: () => void
  changeItemAmount: (id: string, type: string) => void
  addCardToList: (card: Card) => void
  selectCard: (id: number) => void;
  showMessage: () => void;
  hideMessage: () => void;
  showError: (message: string, hadError: boolean) => void
  editCard: (item: Card) => void
  getEditedCardList: (cardList: Card[]) => void
  deleteCardFromList: (id: number) => void
}

export const CartContext = createContext({} as CartContextData)

const initialState: StateType = {
  isLoading: false,
  haveFailed: false,
  amount: 0,
  total: 0,
  cocktails: [],
  cart: [],
  isModalOpen: false,
  cards: [],
  isMessageOpen: false,
  errorAlert: { messageError: '', hadError: false },
  singleCard: { cardNumber: '', cardholder: '', month: '', year: '', cvv: '', isSelected: false }
}

export function CartContextProvider({children}: CartContextProviderProps){
  const [state, dispatch] = useReducer(reducer, initialState)

  function addItemToCart(item: Cocktail){
    dispatch({ type: Actions.ADD_ITEM_TO_CART, payload: item })
  }

  function getTotal(){
    dispatch({ type: Actions.GET_TOTAL })
  }

  function removeItemFromCart(id: string){
    dispatch({ type: Actions.REMOVE_ITEM_FROM_CART, payload: id })
  }

  function clearCart(){
    dispatch({ type: Actions.CLEAR_CART })
  }

  function changeItemAmount(id: string, type: string){
    dispatch({ type: Actions.CHANGE_AMOUNT, payload: { id, type } })
  }

  function toggleModal(){
    dispatch({ type: Actions.TOGGLE_MODAL, payload: state.isModalOpen })
  }

  async function getAllCocktails(){
    dispatch({ type: Actions.LOADING })
    try{
      const response = await fetch(url)
      const data = await response.json()
      const { drinks } = data
      dispatch({ type: Actions.DISPLAY_ITEMS, payload: drinks })
    }catch(error){
      console.log(error)
      dispatch({ type: Actions.REQUEST_FAILED })
    }
  }

  useEffect(() =>{
    getAllCocktails()
  }, [])

  function addCardToList(card: Card){
    dispatch({ type: Actions.ADD_CARD, payload: card })
    dispatch({ type: Actions.TOGGLE_MODAL, payload: state.isModalOpen })
  }

  function selectCard(id: number){
    dispatch({ type: Actions.SELECT_CARD, payload: id })
  }

  function showMessage(){
    dispatch({ type: Actions.SHOW_MESSAGE })
  }

  function hideMessage(){
    dispatch({ type: Actions.HIDE_MESSAGE })

  }

  function showError(message: string, hadError: boolean){
    dispatch({ type: Actions.SHOW_ERROR, payload: { message, hadError } })
  }

  function editCard(item: Card){
    dispatch({ type: Actions.TOGGLE_MODAL, payload: state.isModalOpen })
    dispatch({ type: Actions.EDIT_CARD, payload: {...item}})
  }

  function getEditedCardList(cardList: Card[]){
    dispatch({ type: Actions.EDITED_CARDS, payload: cardList})
    dispatch({ type: Actions.TOGGLE_MODAL, payload: state.isModalOpen })
  }

  function deleteCardFromList(id: number){
    dispatch({ type: Actions.DELETE_CARD, payload: id })
    dispatch({ type: Actions.TOGGLE_MODAL, payload: state.isModalOpen })
  }

  return(
    <CartContext.Provider value={{
      state,
      getAllCocktails,
      getTotal,
      addItemToCart,
      removeItemFromCart,
      clearCart,
      changeItemAmount,
      toggleModal,
      addCardToList,
      selectCard,
      showMessage,
      hideMessage,
      showError,
      editCard,
      getEditedCardList,
      deleteCardFromList
    }}>
      {children}
    </CartContext.Provider>
  )
}