export const CATEGORIAS = ["Alimentação", "Transporte", "Lazer", "Moradia", "Outros"] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export type Despesa = {
  id: string;
  descricao: string;
  valor: number;
  categoria: Categoria;
  paga: boolean;
};
