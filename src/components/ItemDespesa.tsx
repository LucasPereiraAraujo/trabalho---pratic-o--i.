import { Button, Card, Checkbox, Chip, Typography } from "heroui-native";
import type { JSX } from "react";
import { View } from "react-native";

import type { Despesa } from "@/types/despesa";

type Props = {
  despesa: Despesa;
  onAlternarPaga: (id: string) => void;
  onExcluir: (id: string) => void;
};

export function ItemDespesa({ despesa, onAlternarPaga, onExcluir }: Props): JSX.Element {
  return (
    <Card className="mb-3">
      <Card.Body className="gap-2">
        <View className="flex-row items-center justify-between">
          <Card.Title className={despesa.paga ? "line-through opacity-60" : undefined}>
            {despesa.descricao}
          </Card.Title>
          <Typography.Paragraph weight="bold">{despesa.valor.toFixed(2)}</Typography.Paragraph>
        </View>

        <View className="flex-row items-center gap-2">
          <Chip size="sm" variant="soft">
            <Chip.Label>{despesa.categoria}</Chip.Label>
          </Chip>
          <Chip size="sm" variant="soft" color={despesa.paga ? "success" : "warning"}>
            <Chip.Label>{despesa.paga ? "Paga" : "Pendente"}</Chip.Label>
          </Chip>
        </View>
      </Card.Body>

      <Card.Footer className="mt-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Checkbox isSelected={despesa.paga} onSelectedChange={() => onAlternarPaga(despesa.id)}>
            <Checkbox.Indicator />
          </Checkbox>
          <Typography.Paragraph type="body-sm">Marcar como paga</Typography.Paragraph>
        </View>

        <Button size="sm" variant="danger-soft" onPress={() => onExcluir(despesa.id)}>
          <Button.Label>Excluir</Button.Label>
        </Button>
      </Card.Footer>
    </Card>
  );
}
