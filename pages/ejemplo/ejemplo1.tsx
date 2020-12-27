import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

/**
 * https://formik.org/
 * Ejemplo #1 Usando Formik con Yup
 * 
*/
export default function Ejemplo1Page(props){
    const initialValues = {
        nombre: '',
        email: '',
        direccion: '',
        comuna: 0
    }

    const comunas = [
        "Santiago",
        "Pudahuel",
        "Cerro Navia",
        "Lo Prado"
    ]

    /**
     * El método test() permite agregar una funcion personalizada a la cadena de validaciones
     * 
     * Más info de los métodos disponibles de YUP en:
     * https://github.com/jquense/yup
     */
    const validationSchema = Yup.object({
        nombre: Yup.string().min(5, "Debe colocar su nombre completo").max(20, "Su nombre excede el largo máximo permitido.").required("Requerido"),
        email: Yup.string().email("Email inválido").required("Requerido").test("email-organizacion", "Debe ser un correo de la empresa gmail.com", (value, context) => value?.includes('gmail.com')),
        direccion: Yup.string().matches(/[a-zA-Z]{2,} [0-9]{2,}/, 'Debe especificar una dirección válida'),
        comuna: Yup.string().oneOf(comunas, "Debe escoger una comuna")
    })

    return (
        <div className="container p-5 bg-light">
            <h1 className="my-5">Formulario Ejemplo #1</h1>
            {/* Formik es un envoltorio de React Context */}
            <Formik 
                initialValues={ initialValues }
                validationSchema={ validationSchema }
                onSubmit={ (values) => console.log( JSON.stringify(values, null, 4) ) }
            >
                <Form>
                    <div className="form-group">
                        <label className="mr-2" htmlFor="nombre">Nombre</label>
                        <Field name="nombre" type="text" />
                        <div className="invalid-feedback" style={{display: 'block'}}><ErrorMessage className="text-danger" name="nombre" /></div>
                    </div>
                    
                    <div className="form-group">
                        <label className="mr-2" htmlFor="email">Email</label>
                        <Field name="email" type="text" placeholder="nombre@dominio.com" />
                        <div className="invalid-feedback" style={{display: 'block'}}><ErrorMessage className="text-danger" name="email" /></div>
                    </div>

                    <div className="form-group">
                        <label className="mr-2" htmlFor="direccion">Dirección</label>
                        <Field name="direccion" type="text" />
                        <div className="invalid-feedback" style={{display: 'block'}}><ErrorMessage className="text-danger" name="direccion" /></div>
                    </div>

                    <div className="form-group">
                        <label className="mr-2" htmlFor="comuna">Comuna</label>
                        <Field name="comuna" as="select">
                            <option value="0">Seleccione una opción</option>
                            {comunas.map(c => <option key={c}>{c}</option>)}
                        </Field>
                        <div className="invalid-feedback" style={{display: 'block'}}><ErrorMessage className="text-danger" name="comuna" /></div>
                    </div>

                    <button type="submit">Guardar</button>

                </Form>
            </Formik>
        </div>
    )
}