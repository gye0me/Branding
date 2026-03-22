import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("회원가입 성공:", userCredential.user.uid);
    } catch (error) {
      console.log("에러:", error.code);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>회원가입</h2>

      <input
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
        style={{ color: "black" }}
      />

      <br /><br />

      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
        style={{ color: "black" }}
      />

      <br /><br />

      <button onClick={handleSignup}
      style={{
        backgroundColor: "blue",
        color: "white",
        padding: "10px",
        marginTop: "10px",
        cursor: "pointer"
        }}>
        회원가입
      </button>
    </div>
  );
}

export default Signup;