import { Switch, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const sunIcon = <IconSun style={{ width: 24, height: 14 }} stroke={2.5} color="yellow" />;

  const moonIcon = <IconMoonStars style={{ width: 24, height: 14 }} stroke={2.5} color="blue" />;

  return (
    <Switch
      size="lg"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      onChange={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
    />
  );
}
