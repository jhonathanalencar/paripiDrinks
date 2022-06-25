export interface Cocktail{
  idDrink: string;
  strDrink: string;
  price?: string;
  strDrinkThumb: string;
  amount?: number;
}

export interface Cart{
  idDrink: string;
  strDrink: string;
  price?: string;
  strDrinkThumb: string;
  amount: number;
}

export enum Actions{
  LOADING = 'LOADING',
  DISPLAY_ITEMS = 'DISPLAY_ITEMS',
  ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART',
  GET_TOTAL = 'GET_TOTAL',
  REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART',
  CHANGE_AMOUNT = 'CHANGE_AMOUNT'
}

interface ActionType{
  type: Actions;
  payload?: any;
}

export interface StateType{
  isLoading: boolean;
  amount: number;
  total: number;
  cocktails: Cocktail[];
  cart: Cart[];
}

export function reducer(state: StateType, action: ActionType){
  const { type, payload } = action
  switch (type){
    case Actions.DISPLAY_ITEMS:
      return {
        ...state,
        cocktails: payload, isLoading: false,
      }
    case Actions.LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case Actions.ADD_ITEM_TO_CART:
      return {
        ...state,
        cart: [...state.cart, payload]
      }
    case Actions.GET_TOTAL:
      let { total, amount}  = state.cart.reduce((cartTotal, cartItem) =>{
        const { price, amount } = cartItem
        if(price && amount){
          const parsedPrice = parseFloat(price)
          const itemTotal = parsedPrice * amount

          cartTotal.total += itemTotal
          cartTotal.amount += amount
          return cartTotal
        }
        return cartTotal
      }, { total: 0, amount: 0 })
      total = parseFloat(total.toFixed(2))
      return {
        ...state,
        total,
        amount,
      }
    case Actions.REMOVE_ITEM_FROM_CART:
      const newCart = state.cart.filter((item) => item.idDrink !== payload)
      return {
        ...state,
        cart: newCart
      }
    case Actions.CHANGE_AMOUNT:
      const { id, type } = payload
      let tempCart = state.cart.map((item) => {
        if(item.idDrink === payload.id){
          if(type === 'increase'){
            return {
              ...item, amount: item.amount + 1
            }
          }

          if(type === 'decrease'){
            return {
              ...item, amount: item.amount - 1
            }
          }
        }
        return item
      }).filter((item) => item?.amount !== 0)
      return {
        ...state,
        cart: tempCart  
      }
      
    default:
      throw new Error('no match')
  }
}