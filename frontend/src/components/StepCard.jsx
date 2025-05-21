import { Card } from '@radix-ui/themes';
import { Heading } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';
import { Box } from '@radix-ui/themes';
import { Flex } from '@radix-ui/themes';

export default function StepCard({ title, subtitle, content, imgSrc }) {
  return (
    <Box width="90vw">
      <Card variant="ghost">
        <Flex direction="column" gap="2">
          <Box>
            <Heading size="6">{title}</Heading>
            <Heading size="4">{subtitle}</Heading>
          </Box>
          <Text>{content}</Text>
          <img
            src={imgSrc}
            alt="feature image"
            style={{
              borderRadius: '10px',
              width: '25rem',
            }}
          />
        </Flex>
      </Card>
    </Box>
  );
}
