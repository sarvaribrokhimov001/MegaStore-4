import { useState } from "react";
import toast from "react-hot-toast";
import { successStyle, errorStyle } from "../utils/toastStyle";

const RegisterModal = ({ onClose, openLogin }) => {
  const [form, setForm] = useState({
    username:"",
    email:"",
    password:""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("Barcha maydonlarni to'ldiring !" , errorStyle);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(user => user.email === form.email);

    if(exists) {
      toast.error("Bu email allaqachon mavjud !" , errorStyle);
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Account yaratildi !" , successStyle);
    onClose();
    openLogin();
  };

  return(
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999] backdrop-blur-2xl">
      <div className="bg-black text-white w-[500px] rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8"> Register </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input placeholder="Username" className="border p-3 rounded-xl text-[18px] font-bold text-red-600" 
            onChange = {(e) => setForm({
              ...form,
              username:e.target.value
            })} />

          <input placeholder="Email" className="border p-3 rounded-xl text-red-600 text-[18px] font-bold"
            onChange = {(e) => setForm({
              ...form,
              email:e.target.value
            })} />

          <input type="password" placeholder="Password" className="border p-3 rounded-xl text-red-600 text-[18px] font-bold"
            onChange = {(e) => setForm({
              ...form,
              password:e.target.value
            })} />

          <button className="bg-green-600 rounded-xl text-[18px] p-3 font-bold hover:bg-black hover:text-green-400 hover:border"> Register </button>
        </form>

        <p className="text-center mt-6"> Already have account?
            <button className="text-green-500 ml-2 font-bold" onClick = {() => {
                onClose();
                openLogin();
            }}> Login
            </button>
        </p>

        <button className="mt-8 w-full font-bold border rounded-xl p-3 hover:text-red-600 transition-all text-[20px]" onClick={onClose}> Close </button>
     </div>
   </div>
  );
};
export default RegisterModal;