import { Card } from '@radix-ui/themes';
import { Heading } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';
import { Box } from '@radix-ui/themes';

export default function FeatureCard({ title, content }) {
  return (
    <Box width="90vw">
      <Card>
        <Heading size="6">{title}</Heading>
        <Text align="center">{content}</Text>
      </Card>
    </Box>
  );
}
