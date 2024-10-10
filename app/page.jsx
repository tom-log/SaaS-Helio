import Link from "next/link";
import { ROUTES } from '@/routes/routes'

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href={ROUTES.LOGIN}>Login</Link>
    </div>
  );
}

export default Home;
