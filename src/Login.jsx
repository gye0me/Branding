import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("로그인 성공");
    } catch (error) {
      console.log("에러:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full p-6 text-black">
      <h2 className="text-xl font-bold mb-6">로그인</h2>

      <input
        placeholder="이메일"
        className="w-full p-3 mb-3 bg-gray-100 rounded-lg text-black"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        className="w-full p-3 mb-4 bg-gray-100 rounded-lg text-black"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full py-3 bg-[#49B49F] text-white rounded-xl mb-3"
      >
        로그인
      </button>

      <button
        onClick={() => setPage("signup")}
        className="text-sm underline"
      >
        회원가입
      </button>
    </div>
  );
}

export default Login;