import { ActionIcon, Flex, Input, Pagination, Select, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import api from '@/components/Axiosins';
import { CustomTable } from '@/components/CustomTable';

export function BooksList() {
  const [value, setValue] = useState('stephan');
  const [data, setData] = useState([]);
  const [paginationValue, setPaginationValue] = useState(0);
  const [perPage, setPerPage] = useState('10');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSeach();
  }, [paginationValue, perPage]);
  const handleSeach = () => {
    setLoading(true);
    api
      .get('/volumes', {
        params: {
          q: value,
          startIndex: paginationValue,
          maxResults: perPage,
        },
      })
      .then((res) => setData(res.data.items))
      .finally(() => setLoading(false));
  };

  return (
    <Flex direction="column">
      <Flex gap={15}>
        <Input
          placeholder="Kitap ismi arayın..."
          onChange={(val) => setValue(val.currentTarget.value)}
        />
        <ActionIcon onClick={() => handleSeach()} size="lg">
          <IconSearch style={{ width: 25, height: 25 }} color="white" />
        </ActionIcon>
      </Flex>
      {loading ? (
        <Text fz={50}>Yükleniyor</Text>
      ) : (
        <>
          <CustomTable data={data} />
          <Flex>
            <Select
              label="Sayfa başına veri"
              placeholder={perPage}
              data={['10', '20', '50']}
              defaultValue={perPage}
              onChange={(val) => setPerPage(val)}
            />
            <Pagination
              total={parseInt(perPage)}
              onChange={(page) => setPaginationValue((page - 1) * parseInt(perPage))}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
}
