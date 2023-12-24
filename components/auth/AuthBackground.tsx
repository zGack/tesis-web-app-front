import Image from "next/image"
import javeLogoBg from '../../public/jave.png';

export const AuthBackground = () => {
  return (
    <Image
      alt="Pontificia Javeriana Cali Logo"
      src={javeLogoBg}
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'contain',
        padding: '175px',
        opacity: '0.05'
      }}
    />
  )
}
