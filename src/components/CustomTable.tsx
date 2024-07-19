import { ActionIcon, Flex, Image, Table } from '@mantine/core';
import { IconHttpDelete, IconPlaylistAdd } from '@tabler/icons-react';
import { useBookVolumes, useSetBookVolumes } from '@/components/hooks/bookVolume';

export function CustomTable({ data }) {
  const setBooks = useSetBookVolumes();
  const books = useBookVolumes();

  const addCard = (item) => {
    const existItem = books.find((elem) => item.id === elem.id);
    const newCount = (existItem?.count ?? 0) + 1;
    const newItem = { ...item, count: newCount };

    if (!existItem) {
      setBooks([...books, newItem]);
    } else {
      const newCart = books.map((elem) => (item.id === elem.id ? newItem : elem));
      setBooks(newCart);
    }
  };

  const deleteInCard = (item) => {
    if (books.length > 0) {
      let updatedCart = [...books];
      const existItem = updatedCart.find((elem) => item.id === elem.id);

      if (existItem) {
        if (existItem.count && existItem.count > 1) {
          existItem.count -= 1;
        } else {
          updatedCart = updatedCart.filter((elem) => elem.id !== item.id);
        }
        setBooks(updatedCart);
      }
    }
  };

  const rows = data.map((element) => (
    <Table.Tr key={element?.id}>
      <Table.Td>
        <Image src={element?.volumeInfo?.imageLinks?.smallThumbnail} />
      </Table.Td>
      <Table.Td>{element?.saleInfo?.country}</Table.Td>
      <Table.Td>{element?.volumeInfo?.title}</Table.Td>
      <Table.Td>
        <a href={element?.volumeInfo?.infoLink} target="_blank">
          Kitabı Gör
        </a>
      </Table.Td>
      <Table.Td>
        <Flex gap={15}>
          <ActionIcon onClick={() => addCard(element)}>
            <IconPlaylistAdd style={{ width: 20, height: 20 }} />
          </ActionIcon>
          <ActionIcon onClick={() => deleteInCard(element)}>
            <IconHttpDelete style={{ width: 20, height: 20 }} />
          </ActionIcon>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Kitap Dili</Table.Th>
          <Table.Th>Kitap Adı</Table.Th>
          <Table.Th>Kitap Linki</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
