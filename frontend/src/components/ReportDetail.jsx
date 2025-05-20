import { Flex, Text } from '@radix-ui/themes';

export default function ReportDetail({ title, data, input: Input, isEditing }) {
  return (
    <>
      <Flex direction={'column'}>
        <Text weight={'bold'}>{title}</Text>
        {!isEditing && <Text>{data}</Text>}
        {isEditing && Input}
      </Flex>
    </>
  );
}
