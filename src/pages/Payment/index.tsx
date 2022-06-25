import { Plus } from "phosphor-react";
import { CreditCard } from "../../components/CreditCard";
import * as C from './styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export function Payment(){
  return(
    <C.Container>
      <C.Heading>Payment</C.Heading>
      <C.Center>
        <C.Title>saved cards</C.Title>
        <Swiper
          spaceBetween={0}
          slidesPerView={1.15}
          grabCursor
          className="slider"
        >
          <C.CardWrapper>
            <SwiperSlide>
              <CreditCard />
            </SwiperSlide>
            <SwiperSlide>
              <CreditCard />
            </SwiperSlide>
            <SwiperSlide>
              <CreditCard />
            </SwiperSlide>
          </C.CardWrapper>
        </Swiper>
        <C.AddButton>
          new card
          <Plus />
        </C.AddButton>
        <C.PayButton>Pay</C.PayButton>
      </C.Center>
    </C.Container>
  )
}