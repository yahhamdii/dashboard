'use client';

import { m } from 'framer-motion';

import Container from '@mui/material/Container';

import { RouterLink } from 'src/routes/components';
import { useCircuitComponent } from 'src/lib/feature-flags';
import { TypographyWrapper as Typography, ButtonWrapper as Button } from 'src/components/circuit-ui';

import { SimpleLayout } from 'src/layouts/simple';
import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
import { NotFoundViewCircuit } from './not-found-view-circuit';

// ----------------------------------------------------------------------

export function NotFoundView() {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_ERROR_PAGES');

  // Use Circuit UI version if flag is enabled
  if (useCircuit) {
    return <NotFoundViewCircuit />;
  }

  // Default MUI version
  return (
    <SimpleLayout
      slotProps={{
        content: { compact: true },
      }}
    >
      <Container component={MotionContainer}>
        <m.div variants={varBounce('in')}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Sorry, page not found!
          </Typography>
        </m.div>

        <m.div variants={varBounce('in')}>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL? Be
            sure to check your spelling.
          </Typography>
        </m.div>

        <m.div variants={varBounce('in')}>
          <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          Go to home
        </Button>
      </Container>
    </SimpleLayout>
  );
}
