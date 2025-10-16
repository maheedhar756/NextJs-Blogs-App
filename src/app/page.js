import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(authOptions);  // server component will not work in client component

  console.log(session)
  return (
    <div>
      <h3>Blog App</h3>
      {session.user ? <p>Welcome, {session.user.email}</p> : <p>please log in.</p>}
    </div>
  );
}
