"use client"

import { signOut } from "next-auth/react";

function Admin() {
  return (
    <div>
      <button
        onClick={() => signOut()}
        className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
        Log Out
      </button>
      <h1>Admin do Sistema</h1>
    </div>
  );
}

export default Admin;
