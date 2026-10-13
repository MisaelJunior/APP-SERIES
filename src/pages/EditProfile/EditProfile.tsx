import styles from "./EditProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef, type ChangeEvent } from "react";
// import fotoPerfil from "../assets/fotoPerfil.png";
// import banner from "../assets/image 1.png";

const ABA_PERFIL = "Informações do Perfil";
const ABA_SEGURANCA = "Segurança";

interface PerfilForm {
  nomeCompleto: string;
  nickname: string;
  email: string;
  sobre: string;
  fotoPerfil: string | null;
  capaPerfil: string | null;
}

interface SenhaForm {
  senhaAtual: string;
  novaSenha: string;
  confirmarSenha: string;
}

type MostrarSenhaState = Record<keyof SenhaForm, boolean>;

export default function EditProfile() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState<typeof ABA_PERFIL | typeof ABA_SEGURANCA>(ABA_PERFIL);

  const [perfil, setPerfil] = useState<PerfilForm>({
    nomeCompleto: "Misael Junior",
    nickname: "jubileu_esquisito",
    email: "jubileu_esquisito@email.com",
    sobre: "",
    // fotoPerfil: fotoPerfil,
    // capaPerfil: banner,
    fotoPerfil: null,
    capaPerfil: null,
  });
  const [senha, setSenha] = useState<SenhaForm>({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });
  const [mostrarSenha, setMostrarSenha] = useState<MostrarSenhaState>({
    senhaAtual: false,
    novaSenha: false,
    confirmarSenha: false,
  });
  const [erroSenha, setErroSenha] = useState("");

  const inputFotoRef = useRef<HTMLInputElement>(null);
  const inputCapaRef = useRef<HTMLInputElement>(null);

  const atualizarPerfil = <K extends keyof PerfilForm>(campo: K, valor: PerfilForm[K]) => {
    setPerfil((atual) => ({ ...atual, [campo]: valor }));
  };

  const atualizarSenha = <K extends keyof SenhaForm>(campo: K, valor: SenhaForm[K]) => {
    setSenha((atual) => ({ ...atual, [campo]: valor }));
    setErroSenha("");
  };

  const alternarMostrarSenha = (campo: keyof SenhaForm) => {
    setMostrarSenha((atual) => ({ ...atual, [campo]: !atual[campo] }));
  };
 
  const handleAtualizarSenha = () => {
    if (senha.novaSenha.length < 8) {
      setErroSenha("A nova senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    if (senha.novaSenha !== senha.confirmarSenha) {
      setErroSenha("As senhas não coincidem.");
      return;
    }
    // TODO: enviar `senha` para a API
    console.log("Atualizando senha:", senha);
    setErroSenha("");
    setSenha({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
  };
 
  const handleSelecionarFoto = (evento: ChangeEvent<HTMLInputElement>) => {
    const arquivo = evento.target.files?.[0];
    if (arquivo) {
      atualizarPerfil("fotoPerfil", URL.createObjectURL(arquivo));
    }
  };
 
  const handleSelecionarCapa = (evento: ChangeEvent<HTMLInputElement>) => {
    const arquivo = evento.target.files?.[0];
    if (arquivo) {
      atualizarPerfil("capaPerfil", URL.createObjectURL(arquivo));
    }
  };
 
  const handleSalvar = () => {
    console.log("Salvando perfil:", perfil);
  };
 
  return (
    <div className={styles.pagina}>
      <div className={styles.header}>
        <div className={styles.headerEsquerda}>
          <button className={styles.voltar} onClick={() => navigate(-1)}>
            ← Voltar
          </button>
          <span className={styles.tituloHeader}>Editar Perfil</span>
        </div>
 
        <div className={styles.headerAcoes}>
          <button className={styles.botaoCancelar} onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button className={styles.botaoSalvar} onClick={handleSalvar}>
            Salvar alterações
          </button>
        </div>
      </div>
 
      <div className={styles.corpo}>
        <aside className={styles.sidebar}>
          <nav className={styles.navSidebar}>
            <button
              className={`${styles.itemSidebar} ${
                abaAtiva === ABA_PERFIL ? styles.itemSidebarAtivo : ""
              }`}
              onClick={() => setAbaAtiva(ABA_PERFIL)}
            >
              👤 Informações do Perfil
            </button>
            <button
              className={`${styles.itemSidebar} ${
                abaAtiva === ABA_SEGURANCA ? styles.itemSidebarAtivo : ""
              }`}
              onClick={() => setAbaAtiva(ABA_SEGURANCA)}
            >
              🛡 Segurança
            </button>
          </nav>
 
          <div className={styles.sidebarRodape}>
            <button className={styles.sairConta} onClick={() => navigate("/")}>
              ↪ Sair da conta
            </button>
          </div>
        </aside>
 
        <div className={styles.conteudo}>
          {abaAtiva === ABA_PERFIL && (
            <>
              <div className={styles.card}>
                <h2 className={styles.tituloCard}>Capa do Perfil</h2>
                <p className={styles.descricaoCard}>
                  Escolha uma imagem de fundo para o seu perfil
                </p>
                <div
                  className={styles.capaPreview}
                  style={
                    perfil.capaPerfil
                      ? { backgroundImage: `url(${perfil.capaPerfil})` }
                      : undefined
                  }
                  onClick={() => inputCapaRef.current?.click()}
                >
                  {!perfil.capaPerfil && (
                    <span className={styles.capaPlaceholder}>
                      Clique para escolher uma imagem
                    </span>
                  )}
                </div>
                <input
                  ref={inputCapaRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleSelecionarCapa}
                />
              </div>
 
              <div className={styles.card}>
                <h2 className={styles.tituloCard}>Foto de Perfil</h2>
                <p className={styles.descricaoCard}>
                  Sua foto aparece em avaliações, comentários e no seu perfil
                </p>
                <div className={styles.fotoLinha}>
                  <div
                    className={styles.avatarPreview}
                    style={
                      perfil.fotoPerfil
                        ? { backgroundImage: `url(${perfil.fotoPerfil})` }
                        : undefined
                    }
                  ></div>
                  <div>
                    <button
                      className={styles.trocarFoto}
                      onClick={() => inputFotoRef.current?.click()}
                    >
                      Trocar foto
                    </button>
                    <p className={styles.ajudaFoto}>JPG, PNG ou GIF · máx 5MB</p>
                  </div>
                </div>
                <input
                  ref={inputFotoRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleSelecionarFoto}
                />
              </div>
 
              <div className={styles.card}>
                <h2 className={styles.tituloCard}>Informações Básicas</h2>
 
                <label className={styles.campo}>
                  <span className={styles.label}>NOME COMPLETO</span>
                  <input
                    type="text"
                    className={styles.input}
                    value={perfil.nomeCompleto}
                    onChange={(e) => atualizarPerfil("nomeCompleto", e.target.value)}
                  />
                </label>
 
                <label className={styles.campo}>
                  <span className={styles.label}>NICKNAME</span>
                  <input
                    type="text"
                    className={styles.input}
                    value={perfil.nickname}
                    onChange={(e) => atualizarPerfil("nickname", e.target.value)}
                  />
                  <span className={styles.ajuda}>
                    Seu nickname aparece no seu link de perfil
                  </span>
                </label>
 
                <label className={styles.campo}>
                  <span className={styles.label}>E-MAIL</span>
                  <input type="email" className={styles.inputDesabilitado} value={perfil.email} disabled />
                  <span className={styles.ajuda}>
                    O e-mail não pode ser alterado por aqui. Entre em contato com o suporte.
                  </span>
                </label>
              </div>
 
              <div className={styles.card}>
                <h2 className={styles.tituloCard}>Sobre Você</h2>
                <label className={styles.campo}>
                  <textarea
                    className={styles.textarea}
                    placeholder="Conte um pouco sobre você, seus filmes favoritos, gêneros preferidos..."
                    value={perfil.sobre}
                    onChange={(e) => atualizarPerfil("sobre", e.target.value)}
                    maxLength={280}
                  />
                  <span className={styles.contadorCaracteres}>
                    {perfil.sobre.length}/280
                  </span>
                </label>
              </div>
            </>
          )}
 
          {abaAtiva === ABA_SEGURANCA && (
            <>
              <div className={styles.card}>
                <h2 className={styles.tituloCard}>Alterar Senha</h2>
                <p className={styles.descricaoCard}>
                  Use uma senha forte com pelo menos 8 caracteres.
                </p>
 
                <label className={styles.campo}>
                  <span className={styles.label}>SENHA ATUAL</span>
                  <div className={styles.campoSenha}>
                    <input
                      type={mostrarSenha.senhaAtual ? "text" : "password"}
                      className={styles.input}
                      value={senha.senhaAtual}
                      onChange={(e) => atualizarSenha("senhaAtual", e.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.toggleSenha}
                      onClick={() => alternarMostrarSenha("senhaAtual")}
                      aria-label="Mostrar ou ocultar senha"
                    >
                      👁
                    </button>
                  </div>
                </label>
 
                <label className={styles.campo}>
                  <span className={styles.label}>NOVA SENHA</span>
                  <div className={styles.campoSenha}>
                    <input
                      type={mostrarSenha.novaSenha ? "text" : "password"}
                      className={styles.input}
                      value={senha.novaSenha}
                      onChange={(e) => atualizarSenha("novaSenha", e.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.toggleSenha}
                      onClick={() => alternarMostrarSenha("novaSenha")}
                      aria-label="Mostrar ou ocultar senha"
                    >
                      👁
                    </button>
                  </div>
                </label>
 
                <label className={styles.campo}>
                  <span className={styles.label}>CONFIRMAR NOVA SENHA</span>
                  <div className={styles.campoSenha}>
                    <input
                      type={mostrarSenha.confirmarSenha ? "text" : "password"}
                      className={styles.input}
                      value={senha.confirmarSenha}
                      onChange={(e) => atualizarSenha("confirmarSenha", e.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.toggleSenha}
                      onClick={() => alternarMostrarSenha("confirmarSenha")}
                      aria-label="Mostrar ou ocultar senha"
                    >
                      👁
                    </button>
                  </div>
                </label>
 
                {erroSenha && <p className={styles.erroSenha}>{erroSenha}</p>}
 
                <button className={styles.botaoAtualizar} onClick={handleAtualizarSenha}>
                  Atualizar Senha
                </button>
              </div>
 
              <div className={styles.card}>
                <h2 className={styles.tituloCard}>Sessões Ativas</h2>
                <p className={styles.descricaoCard}>Dispositivos conectados à sua conta</p>
                <div className={styles.sessoesPlaceholder}>Em Breve</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}