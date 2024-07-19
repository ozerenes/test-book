import { AppShell, Badge, Burger, Flex, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAddressBook, IconBook, IconCards, IconHome } from '@tabler/icons-react';
import { Router } from '@/Router';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { useBookVolumes } from '@/components/hooks/bookVolume';

export function CustomAppShell() {
  const [opened, { toggle }] = useDisclosure();
  const books = useBookVolumes();

  const calculateCartLength = () =>
    books.reduce((accumulator, currentValue) => accumulator + (currentValue?.count ?? 0), 0);

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconAddressBook style={{ width: 40, height: 40 }} color="red" />
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          href="/"
          label="Home"
          leftSection={<IconHome style={{ width: 20, height: 20 }} />}
        />
        <NavLink
          href="/test"
          label="Test"
          leftSection={<IconBook style={{ width: 20, height: 20 }} />}
        />
        <Flex gap={15} mt={10}>
          <IconCards style={{ width: 30, height: 30 }} />
          <Badge size="xl"> {books?.length > 0 ? calculateCartLength() : 0}</Badge>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>
        <Router />
      </AppShell.Main>
    </AppShell>
  );
}
