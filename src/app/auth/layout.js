import Image from "next/image";
//import '@/app/globals.css'

const metadata = {
  title: "Title",
  description: "lorem ipsum dolor set",
};

export default function AuthLayout({ children }) {
  return (
    <div style={{display: 'flex', height: '100vh',}}>
      <div style={{width: '45%', height: '100%', position: 'relative', objectFit: 'cover'}}>
        <Image src='/assets/auth-image.png' alt='auth-image' style={{width: '100%', height: '100%', objectFit: 'cover'}} fill />
      </div>
      {children}
    </div>
  );
}
