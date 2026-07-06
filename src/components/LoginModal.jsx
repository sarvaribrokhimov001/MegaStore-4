import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { successStyle, errorStyle } from "../utils/toastStyle";

const LoginModal = ({ onClose, openRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Bo'sh maydonni to'ldiring !" , errorStyle);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (!foundUser) {
      toast.error("Email yoki password noto'g'ri kiritildi !" , errorStyle);
      return;
    }

    login(foundUser);
    toast.success("Muvaffaqiyatli login qilindi !" , successStyle);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999] backdrop-blur-2xl">
      <div className="bg-black text-white w-[500px] rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8"> Login </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            placeholder="Email"
            className="border p-3 font-bold text-[18px] rounded-xl text-red-600"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 font-bold text-[18px] rounded-xl text-red-600"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="bg-red-600 rounded-xl p-3 text-[18px] font-bold hover:bg-black hover:text-white hover:border-white hover:border"> Login </button>
        </form>

        <p className="text-center mt-6"> Account yo'qmi?
          <button className="text-red-600 ml-2 font-bold" onClick={() => {
            onClose();
            openRegister();
          }}>
            Register
          </button>
        </p>

        <button className="mt-8 w-full font-bold border rounded-xl p-3 hover:text-red-600 transition-all text-[20px]" onClick={onClose}> Close </button>
      </div>
    </div>
  );
};
export default LoginModal;