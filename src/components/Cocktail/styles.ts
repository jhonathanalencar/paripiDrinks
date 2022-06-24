import styled from "styled-components";

export const Container = styled.div`
  background-color: #373737;
  padding: 1rem;
  border-radius: .25rem;
`;

export const IconWrap = styled.button`
  position: absolute;
  bottom: .25rem;
  right: -4rem;
  color: #fff;
  background-color: aqua;
  padding: 1rem;
  border: none;
  display: flex;
  cursor: pointer;
  transition: all .3s ease-in-out;
  z-index: 2;
  
  .cart-icon{
    font-size: 1.75rem;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageWrap = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  
  &:hover ${Image}{
    filter: opacity(.7);
  }

  &:hover ${IconWrap}{
    right: 0rem;
  }
`;

export const InfoDiv = styled.div`
`;

export const Title = styled.strong`
  color: #fff;
  display: block;
  letter-spacing: .1rem;
  font-size: 1rem;
`;

export const Price = styled.span`
  color: #fff;
  display: block;
  text-align: right;
  font-size: 1rem;
`;