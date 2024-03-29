import { X } from 'phosphor-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCartContext';
import { Card } from '../../utils/reducer';
import { CreditCard } from '../CreditCard'
import { ErrorMessage } from '../ErrorMessage';
import * as C from './styles'

const monthsArray = Array.from({ length: 12 }, (x, i) =>{
  const month = i + 1;
  return month <= 9 ? '0' + month : month
})
const currentYear = new Date().getFullYear()
const yearsArray = Array.from({ length: 12 }, (x, i) => currentYear + i)

interface NewCardProps{
  item?: Card
}

export function NewCard({item}: NewCardProps){
  const { 
    toggleModal, 
    addCardToList, 
    state, 
    showError, 
    getEditedCardList, 
    deleteCardFromList 
  } = useCart()

  const [number, setNumber] = useState(`${state?.singleCard.isSelected ? item?.cardNumber : ''}`)
  const [name, setName] = useState(`${state?.singleCard.isSelected ? item?.cardholder : ''}`)
  const [month, setMonth] = useState(`${state?.singleCard.isSelected ? item?.month : ''}`)
  const [year, setYear] = useState(`${state?.singleCard.isSelected ? item?.year : ''}`)
  const [cvv ,setCvv] = useState(`${state?.singleCard.isSelected ? item?.cvv : '' }`)

  function handleAddCard(){
    if(number.trim().length === 0){
      showError("Please enter card number", true)
    }else if(name.trim().length === 0){
      showError("Please enter cardholder name", true)
    }else if(!month){
      showError("Please select a month", true)
    }else if(!year){
      showError("Please select a year", true)
    }else if(cvv.trim() === ''){
      showError("Please enter cvv", true)
    }else if(!number.match(('[0-9]+'.repeat(16)))){
      showError("Card number invalid", true)
    }else if(name.trim().length < 3){
      showError("cardholder name must have atleast 3 digits", true)
    }else if(!name.split(' ').join('').toLowerCase().match('[a-z]+'.repeat(name.split(' ').join('').length))){
      showError("Cardholder name invalid", true)
    }else if(!cvv.match(('[0-9]+'.repeat(3)))){  
      showError("CVV invalid", true)
    }else{
      if(state?.singleCard.isSelected){
        const tempCardList = state.cards.map((card, index) =>{
          if(item?.id === index){
            return {
              ...item,
              cardholder: name,
              cardNumber: number,
              cvv,
              month,
              year
            }
          }
          return card
        })

        getEditedCardList(tempCardList)
        showError('', false)
      }else{
        addCardToList({ cardNumber: number, cardholder: name, year, month, cvv, isSelected: false })
        showError('', false)
      }
    }
  }

  function handleCloseModal(){
    toggleModal()
    showError('', false)
  }

  useEffect(() =>{
    showError('', false)
  }, [])

  return(
    <C.Container>
      <C.Center>
        <C.CloseButton
          type="button"
          onClick={handleCloseModal}
        >
          <X />
        </C.CloseButton>
        <C.Card>
          <CreditCard item={{ cardNumber: number, cardholder: name, month, year, cvv, isSelected: false }} />
          
        </C.Card>
        <C.CardInfo>
          {state.errorAlert.hadError && <ErrorMessage /> }
          <C.Form>
            <C.Label htmlFor="card-number-field">
              <C.LabelTitle>card number</C.LabelTitle>
              <C.Input 
                type="text" 
                name="card-number-field" 
                maxLength={16}
                value={number}
                onChange={e => setNumber(e.target.value)}
              />
            </C.Label>
            <C.Label htmlFor="cardholder-field">
              <C.LabelTitle>Cardholder name</C.LabelTitle>
              <C.Input 
                type="text" 
                name="cardholder-field" 
                maxLength={25}
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </C.Label>
            <C.DateInfo>
              <C.Label htmlFor="expiry-date-field">
                <C.LabelTitle>expiry date <span>(MM/YY)</span></C.LabelTitle>
                <C.ExpiryDateWrap>
                  <C.Select 
                    name="expiry-date-field"
                    value={month}
                    onChange={e => setMonth(e.target.value)}
                  >
                    <option value="" disabled>Month</option>
                    {monthsArray.map((value, index) =>{
                      return(
                        <option key={index} value={value}>
                          {value}
                        </option>
                      )
                    })}
                  </C.Select>
                  <C.Select 
                    name="expiry-date-year"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                  >
                    <option value="" disabled>Year</option>
                    {yearsArray.map((value, index) => {
                      return(
                        <option key={index} value={value}>
                          {value}
                        </option>
                      )
                    })}
                  </C.Select>
                </C.ExpiryDateWrap>
              </C.Label>
              <C.Label htmlFor="cvv-field">
                <C.LabelTitle>CVV</C.LabelTitle>
                <C.Input 
                  type="password" 
                  name="cvv-field" 
                  autoComplete='off' 
                  maxLength={3} 
                  value={cvv}
                  onChange={e => setCvv(e.target.value)}
                />
              </C.Label>
            </C.DateInfo>
            {state?.singleCard.isSelected ? (
              <C.ButtonsWrap>
                <C.DeleteButton
                  type="button"
                  onClick={() => deleteCardFromList(item?.id!)}
                >
                  delete card</C.DeleteButton>
                <C.Button 
                  type="button"
                  onClick={handleAddCard}
                >
                  Save</C.Button>
              </C.ButtonsWrap>
            ) : (
              <C.Button 
                type="button"
                onClick={handleAddCard}
              >
                Done</C.Button>
            )}
          </C.Form>
        </C.CardInfo>
      </C.Center>
    </C.Container>
  )
}