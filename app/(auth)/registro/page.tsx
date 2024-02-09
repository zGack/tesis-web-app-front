import { RegisterForm } from "./ui/RegisterForm";


const Register = () => {

  return (
    <div className="flex justify-center self-start w-full z-10">
      <div className="flex flex-col px-3 pt-4 pb-3 bg-white text-black rounded-sm max-w-sm w-full shadow-sm">
        <h2 className="flex text-xl font-semibold">Crear Cuenta</h2>
        <hr className="h-px mb-6 mt-1 bg-gray-300 border-0 "></hr>
        <RegisterForm/>        
      </div>
    </div>
  )
}

export default Register;