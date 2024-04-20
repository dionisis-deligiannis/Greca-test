import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container"> {/* This applies global styles */}
      <h1 className="title">Greca Test</h1> {/* This applies global styles */}
      <Link href="/form">
        <a className="link">Form</a> {/* This applies global styles */}
      </Link>
    </div>
  );
}