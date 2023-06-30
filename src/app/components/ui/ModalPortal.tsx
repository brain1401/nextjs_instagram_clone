import reactDom from 'react-dom';

type Props = {
  children : React.ReactNode;
}

export default function ModalPortal ({children}: Props){ //children에 전달한 요소를 portal이라는 id를 가진 요소에 연결해주는 역할이다.
  if(typeof window === 'undefined') { //서버사이드 환경일때는 아무것도 반환해주지 않을 것이라는것을 의미한다.
    return null;
  }

  const node = document.getElementById('portal') as Element;
  
  return reactDom.createPortal(children, node) //children을 node에 연결해준다
}