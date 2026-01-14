/**
 * POC: NotFound View with Circuit UI
 * 
 * This is a proof of concept to validate Circuit UI integration
 * alongside MUI. Use feature flag USE_CIRCUIT_ERROR_PAGES to toggle.
 */

'use client';

import { m } from 'framer-motion';

import Container from '@mui/material/Container';

import { Headline, Body } from '@sumup-oss/circuit-ui';

import { RouterLink } from 'src/routes/components';
import { ButtonWrapper } from 'src/components/circuit-ui';

import { SimpleLayout } from 'src/layouts/simple';
import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function NotFoundViewCircuit() {
  return (
    <SimpleLayout
      slotProps={{
        content: { compact: true },
      }}
    >
      <Container component={MotionContainer}>
        <m.div variants={varBounce('in')}>
          <Headline as="h1" size="l" style={{ marginBottom: '16px' }}>
            Sorry, page not found!
          </Headline>
        </m.div>

        <m.div variants={varBounce('in')}>
          <Body size="m" style={{ color: '#6B7280' }}>
            Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL? Be
            sure to check your spelling.
          </Body>
        </m.div>

        <m.div variants={varBounce('in')}>
          <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <m.div variants={varBounce('in')}>
          <ButtonWrapper
            component={RouterLink}
            href="/"
            variant="contained"
            size="medium"
          >
            Go to home
          </ButtonWrapper>
        </m.div>
      </Container>
    </SimpleLayout>
  );
}

