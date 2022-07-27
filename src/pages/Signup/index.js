import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Toaster, toast } from "react-hot-toast";

export function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    age: "",
    carrerMigration: "",
  });
  console.log(form);

  const [img, setImg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(e.target);
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/upload-image", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (
        form.email !== form.confirmEmail ||
        form.password !== form.confirmPassword
      ) {
        toast.error("Email ou senha não conrrespondem a confirmação");
        return;
      }
      // const response = await api.post("/user/signup", form);
      // console.log(response.data);

      // navigate("/login");
      // toast.success("Seu cadastro foi efetuado com sucesso !");

      const imgURL = await handleUpload();
      await api.post("/user/signup", { ...form, img: imgURL });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <Link to="/">
          <header className={styles.header}>DIÁRIO DO BOOTCAMPER</header>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="formName">Nome:</label>
        <input
          id="formName"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
        <label htmlFor="formImg">Sua foto de perfil:</label>
        <input type="file" id="formImg" onChange={handleImage} />

        <label htmlFor="formEmail">E-mail:</label>
        <input
          id="formEmail"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor="formConfirmEmail">Confirmação de E-mail:</label>
        <input
          id="formConfirmEmail"
          name="confirmEmail"
          type="email"
          value={form.confirmEmail}
          onChange={handleChange}
        />
        <label htmlFor="formPassword">Senha:</label>
        <input
          id="formPassword"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <label htmlFor="formConfirmPassword">Confirmação de senha</label>
        <input
          id="formConfirmPassword"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <label htmlFor="age">Idade</label>
        <input
          id="age"
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />
        <label htmlFor="carrerMigration">Migração de Carreira</label>
        <input
          id="carrerMigrationYes"
          type="radio"
          name="carrerMigration"
          value={true}
          onChange={handleChange}
        />
        <label htmlFor="carrerMigration">Sim</label>
        <input
          id="carrerMigrationNo"
          type="radio"
          name="carrerMigration"
          value={false}
          onChange={handleChange}
        />
        <label htmlFor="carrerMigration">Não</label>
        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}
