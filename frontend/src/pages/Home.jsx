<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>
        Welcome to CoPo. <Link to="/sign-up">Create an account</Link> or{" "}
        <Link to="/login">login</Link> to get started!
      </p>
    </div>
=======
export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Put something interesting here!</p>
      <button> Learn More </button>
    </>
>>>>>>> main
  );
}
