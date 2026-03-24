import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("회원가입 성공:", userCredential.user.uid);
      alert("회원가입 성공!");
    } catch (error) {
      console.log("에러:", error.code);
      alert("회원가입 실패: " + error.message);
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

      <input
        type="password"
        placeholder="비밀번호 확인"
        onChange={(e) => setConfirmPassword(e.target.value)}
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