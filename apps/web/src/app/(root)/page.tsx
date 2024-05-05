import React from 'react';

// const getSession = async () => {
//   const response = await fetch('/api/session', {
//     method: 'GET',
//     credentials: 'include',
//     headers: { 'Content-Type': 'application/json' },
//   });
//   const session = await response.json();

//   if (!session) return null;

//   return session;
// };

export default async function Home() {
  // const session = await getSession();

  // console.log(session);

  return <div className="h-[1000px] p-2">page</div>;
}
