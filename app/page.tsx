import React from 'react'
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
  <>
    <h1>Greca Test</h1>
    <Link href="/form">Form</Link >
    </>

  );
}
