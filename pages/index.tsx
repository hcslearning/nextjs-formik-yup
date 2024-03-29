import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/ejemplo/ejemplo1">
            <a>Ejemplo #1: Formik y Yup</a>
          </Link>
        </li>
        <li>
          <Link href="/ejemplo/ejemplo2">
            <a>Ejemplo #2: Material React, Formik y Yup</a>
          </Link>
        </li>
        <li>
          <Link href="/ejemplo/ejemplo3">
            <a>Ejemplo #3: Material React, Formik y Yup con actualización dinámica de comunas según región</a>
          </Link>
        </li>
        <li>
          <Link href="/ejemplo/ejemplo4">
            <a>Ejemplo #4: Formik, Yup y validación condicional de campos (referencia a otro campo)</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
