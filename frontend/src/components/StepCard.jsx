import { Card } from '@radix-ui/themes';
import { Heading } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';
import { Box } from '@radix-ui/themes';
import { Flex } from '@radix-ui/themes';

export default function StepCard({ title, subtitle, content, imgSrc }) {
  return (
    <Box width={'100%'}>
      <Card variant="">
        <Flex direction="column" gap="2">
          <Box>
            <Heading size="6">{title}</Heading>
            <Heading size="4">{subtitle}</Heading>
          </Box>
          <Text>{content}</Text>
          <Flex justify={'center'} align={'center'}>
            <img
              src={imgSrc}
              alt="feature image"
              style={{
                borderRadius: '10px',
                width: '40vh',
              }}
            />
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
