import { Flex, Text } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';

export default function MissingImage() {
  return (
    <Flex
      className="missing-image-container"
      justify="center"
      align={'center'}
      direction={'column'}
    >
      <Cross2Icon width="30px" height="30px" />
      <Text weight={'light'}>Picture Mising</Text>
    </Flex>
  );
}
