import { Typography } from "heroui-native";
import type { JSX } from "react";
import { useState } from "react";
import { FlatList, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FormularioDespesa } from "@/components/FormularioDespesa";
import { ItemDespesa } from "@/components/ItemDespesa";
import { ResumoTotal } from "@/components/ResumoTotal";
import type { Categoria, Despesa } from "@/types/despesa";

export default function HomeScreen(): JSX.Element {
  const [despesas, setDespesas] = useState<Despesa[]>([]);

  const total = despesas.reduce((soma, despesa) => soma + despesa.valor, 0);

  function adicionarDespesa(descricao: string, valor: number, categoria: Categoria): void {
    const nova: Despesa = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      descricao,
      valor,
      categoria,
      paga: false,
    };
    setDespesas((atual) => [nova, ...atual]);
  }

  function alternarPaga(id: string): void {
    setDespesas((atual) =>
      atual.map((despesa) => (despesa.id === id ? { ...despesa, paga: !despesa.paga } : despesa)),
    );
  }

  function excluirDespesa(id: string): void {
    setDespesas((atual) => atual.filter((despesa) => despesa.id !== id));
  }

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={despesas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemDespesa
              despesa={item}
              onAlternarPaga={alternarPaga}
              onExcluir={excluirDespesa}
            />
          )}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <View className="gap-6 pb-4">
              <View className="items-center gap-2">
                <Image
                  source={require("../../assets/images/icon.png")}
                  style={{ width: 72, height: 72, borderRadius: 16 }}
                />
                <Typography.Heading type="h2">Cade meu leleu?</Typography.Heading>
                <Typography.Paragraph type="body-sm" color="muted">
                  Acompanhe onde foi seu dinheiro! (ele nao sumiu, vc gastou)
                </Typography.Paragraph>
              </View>

              <ResumoTotal total={total} quantidade={despesas.length} />
              <FormularioDespesa onAdicionar={adicionarDespesa} />

              <Typography.Heading type="h4">Despesas cadastradas</Typography.Heading>
            </View>
          }
          ListEmptyComponent={
            <Typography.Paragraph color="muted" align="center">
              Você precisa cadastrar uma despesa primeiro ein.
            </Typography.Paragraph>
          }
        />
      </SafeAreaView>
    </View>
  );
}
