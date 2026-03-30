import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // 파일 상태 관리 (초기값은 null)
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("선택된 파일 없음");

  // 파일 선택 시 실행되는 함수
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file); // 실제 파일 객체 저장
      setFileName(file.name); // 화면에 표시할 파일 이름 저장
    }
  };

  const handleSignup = async () => {
    // 1. 이메일/비밀번호 빈칸 확인
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    // 2. 비밀번호 일치 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 3. 비밀번호 길이 확인
    if (password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    // 4. [필수] 합격 인증 파일 업로드 여부 확인
    if (!selectedFile) {
      alert("대학생 인증을 위해 합격통지서 또는 재학증명서(이미지/PDF)를 첨부해 주세요.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("회원가입 성공:", userCredential.user.uid);
      alert("회원가입 성공! 인증 서류는 관리자 확인 후 승인됩니다.");
    } catch (error) {
      console.log("에러:", error.code);
      alert("회원가입 실패: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>회원가입</h2>

      {/* 이메일 입력 */}
      <input
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ 
          color: "black", 
          width: "100%", 
          padding: "12px", 
          boxSizing: "border-box",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
      />

      {/* 비밀번호 입력 */}
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ 
          color: "black", 
          width: "100%", 
          padding: "12px", 
          boxSizing: "border-box",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
      />

      {/* 비밀번호 확인 입력 */}
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ 
          color: "black", 
          width: "100%", 
          padding: "12px", 
          boxSizing: "border-box",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
      />

      {/* --- 대학생 인증 섹션 --- */}
      <div style={{ 
        border: "1px solid #ddd", 
        padding: "15px", 
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
        marginBottom: "25px"
      }}>
        <p style={{ 
          fontSize: "14px", 
          fontWeight: "bold", 
          margin: "0 0 10px 0", 
          color: "#333" 
        }}>
          🎓 대학생 인증 (합격통지서 또는 재학증명서 첨부)
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label 
            htmlFor="file-upload" 
            style={{
              padding: "8px 15px",
              backgroundColor: "#ffffff",
              border: "1px solid #007bff",
              color: "#007bff",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500"
            }}
          >
            파일 선택
          </label>
          <input 
            id="file-upload"
            type="file" 
            accept="image/*, .pdf" 
            onChange={handleFileChange}
            style={{ display: "none" }} 
          />
          <span style={{ 
            fontSize: "12px", 
            color: selectedFile ? "#333" : "#888", 
            overflow: "hidden", 
            textOverflow: "ellipsis", 
            whiteSpace: "nowrap",
            maxWidth: "150px"
          }}>
            {fileName}
          </span>
        </div>
        <p style={{ fontSize: "11px", color: "#999", marginTop: "8px" }}>
          * 이미지(JPG, PNG) 또는 PDF 파일만 가능합니다.
        </p>
      </div>

      {/* 회원가입 버튼: 파일이 없으면 회색, 있으면 파란색으로 변경됨 */}
      <button 
        onClick={handleSignup}
        style={{
          backgroundColor: selectedFile ? "blue" : "#cccccc",
          color: "white",
          padding: "15px",
          width: "100%",
          border: "none",
          borderRadius: "6px",
          cursor: selectedFile ? "pointer" : "not-allowed",
          fontWeight: "bold",
          fontSize: "16px",
          transition: "background-color 0.3s"
        }}
      >
        회원가입 하기
      </button>
    </div>
  );
}

export default Signup;