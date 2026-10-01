import type { Avaliacao } from "../types/filme";

const calcularMedia = (avaliacoes: Avaliacao[] | undefined | null): number => {
  if (!avaliacoes || avaliacoes.length === 0) {
    return 0;
  }

  const soma = avaliacoes.reduce(
    (total, avaliacao) => total + avaliacao.nota,
    0
  );

  return soma / avaliacoes.length;
};

export default calcularMedia;
