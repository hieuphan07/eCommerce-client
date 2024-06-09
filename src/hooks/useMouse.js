import { useState } from 'react';

const useMouse = () => {
  const [activeImage, setActiveImage] = useState(null);

  const mouseEnterHandler = (index) => {
    setActiveImage(index);
  }
  const mouseLeaveHandler = () => {
    setActiveImage(null);
  }

  return [activeImage, mouseEnterHandler, mouseLeaveHandler]
}

export default useMouse;