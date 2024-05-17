import Image from "next/image";
//import '@/app/globals.css'

const metadata = {
  title: "Title",
  description: "lorem ipsum dolor set",
};

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="w-[45%] h-full relative object-cover hidden md:block">
        <Image src='/assets/auth-image.png' alt='auth-image' className="w-full h-full object-cover" fill />
      </div>
      {children}
    </div>
  );
}

