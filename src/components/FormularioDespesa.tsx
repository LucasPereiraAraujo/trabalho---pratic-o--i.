import { Button, Chip, Description, FieldError, Input, Label, TextField } from "heroui-native";
import type { JSX } from "react";
import { useState } from "react";
import { View } from "react-native";

import { CATEGORIAS, type Categoria } from "@/types/despesa";

type Props = {
  onAdicionar: (descricao: string, valor: number, categoria: Categoria) => void;
};

type Erros = {
  descricao?: string;
  valor?: string;
  categoria?: string;
};

export function FormularioDespesa({ onAdicionar }: Props): JSX.Element {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [erros, setErros] = useState<Erros>({});

  function validar(): number | null {
    const novosErros: Erros = {};
    const valorNumerico = Number(valor.trim().replace(",", "."));

    if (descricao.trim() === "") {
      novosErros.descricao = "A descrição nao pode ficar vazia";
    }
    if (valor.trim() === "") {
      novosErros.valor = "E gastou quanto irmão? Anota ai";
    } else if(Number.isNaN(valorNumerico) || valorNumerico <= 0) {
      novosErros.valor = "Informe um valor maior que zero.";
    }
    if (categoria === null) {
      novosErros.categoria = "Escolha uma categoria.";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0 ? valorNumerico : null;
  }

  function enviar(): void {
    const valorNumerico = validar();
    if (valorNumerico === null || categoria === null) {
      return;
    }

    onAdicionar(descricao.trim(), valorNumerico, categoria);
    setDescricao("");
    setValor("");
    setCategoria(null);
    setErros({});
  }

  return (
    <View className="gap-4">
      <TextField isRequired isInvalid={!!erros.descricao}>
        <Label>Descrição</Label>
        <Input placeholder="Ex.: Almoço" value={descricao} onChangeText={setDescricao} />
        <FieldError>{erros.descricao}</FieldError>
      </TextField>

      <TextField isRequired isInvalid={!!erros.valor}>
        <Label>Valor (R$)</Label>
        <Input
          placeholder="0,00"
          keyboardType="decimal-pad"
          value={valor}
          onChangeText={setValor}
        />
        <FieldError>{erros.valor}</FieldError>
      </TextField>

      <TextField isRequired isInvalid={!!erros.categoria}>
        <Label>Categoria</Label>
        <View className="flex-row flex-wrap gap-2">
          {CATEGORIAS.map((item) => (
            <Chip
              key={item}
              variant={categoria === item ? "primary" : "secondary"}
              onPress={() => setCategoria(item)}
            >
              <Chip.Label>{item}</Chip.Label>
            </Chip>
          ))}
        </View>
        {erros.categoria ? (
          <FieldError>{erros.categoria}</FieldError>
        ) : (
          <Description>Toque para selecionar.</Description>
        )}
      </TextField>

      <Button onPress={enviar}>
        <Button.Label>Adicionar despesa</Button.Label>
      </Button>
    </View>
  );
}
