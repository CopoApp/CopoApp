import { IconButton, Flex } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';

export default function NavBarButton({ icon: Icon, ...props }) {
  const { text, handleClick } = props;
  return (
    <>
      <Flex direction={'column'} align={'center'} onClick={handleClick} gap={'1'}>
        <IconButton style={{ cursor: 'pointer' }} highContrast="true" size={'3'}>
          <Icon width="20px" height={'20px'}></Icon>
        </IconButton>
        <Text className="navbar-tips" weight={'bold'} align={'center'} wrap={'wrap'}>
          {text}
        </Text>
      </Flex>
    </>
  );
}
