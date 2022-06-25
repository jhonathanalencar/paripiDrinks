import { Minus, Plus, X } from 'phosphor-react'
import { Cocktail } from '../../utils/reducer'
import * as C from './styles'

interface CartItemProps{
  item: Cocktail;
}

export function CartItem({ item }: CartItemProps){
  const { 
    idDrink: id, 
    strDrink: title, 
    strDrinkThumb: url, 
    amount, 
    price 
  } = item
  return(
    <C.Item>
      <C.ImageWrap>
        <C.Image src={url} alt={title} />
      </C.ImageWrap>
      <C.ItemInfo>
        <C.Title>{title}</C.Title>
        <C.Amount>{amount}</C.Amount>
        <C.Price>$ {price}</C.Price>
      </C.ItemInfo>
      <C.ButtonsWrap>
        <C.CloseButton>
          <X />
        </C.CloseButton>
        <C.IncreaseButton>
          <Plus />
        </C.IncreaseButton>
        <C.DecreaseButton>
          <Minus />
        </C.DecreaseButton>
      </C.ButtonsWrap>
    </C.Item>
  )
}