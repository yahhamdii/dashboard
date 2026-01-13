import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';


// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
