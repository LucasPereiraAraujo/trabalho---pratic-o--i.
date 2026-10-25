import { Card, Typography } from "heroui-native";
import type { JSX } from "react";


type Props = {
  total: number;
  quantidade: number;
};

export function ResumoTotal({ total, quantidade }: Props): JSX.Element {
  return (
    <Card variant="secondary" className="items-center">
      <Typography.Paragraph type="body-sm" color="muted">
        Total de despesas ({quantidade})
      </Typography.Paragraph>
      <Typography.Heading type="h2">{total.toFixed(2)}</Typography.Heading>
    </Card>
  );
}
