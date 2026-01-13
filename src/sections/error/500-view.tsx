'use client';

import { m } from 'framer-motion';

import Container from '@mui/material/Container';

import { RouterLink } from 'src/routes/components';
import { TypographyWrapper as Typography, ButtonWrapper as Button } from 'src/components/circuit-ui';

import { SimpleLayout } from 'src/layouts/simple';
import { ServerErrorIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function View500() {
  return (
    <SimpleLayout
      slotProps={{
        content: { compact: true },
      }}
    >
      <Container component={MotionContainer}>
        <m.div variants={varBounce('in')}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            500 Internal server error
          </Typography>
        </m.div>

        <m.div variants={varBounce('in')}>
          <Typography sx={{ color: 'text.secondary' }}>
            There was an error, please try again later.
          </Typography>
        </m.div>

        <m.div variants={varBounce('in')}>
          <ServerErrorIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          Go to home
        </Button>
      </Container>
    </SimpleLayout>
  );
}
