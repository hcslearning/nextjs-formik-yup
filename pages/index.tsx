import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/ejemplo/ejemplo1">
            <a>Ejemplo #1</a>
          </Link>
        </li>
        <li>
          <a href="#">Ejemplo #2</a>
        </li>
        <li>
          <a href="#">Ejemplo #3</a>
        </li>
        <li>
          <a href="#">Ejemplo #4</a>
        </li>
      </ul>
    </div>
  )
}
