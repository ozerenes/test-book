import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { CustomAppShell } from '@/components/CustomAppShell';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <CustomAppShell />
    </MantineProvider>
  );
}
