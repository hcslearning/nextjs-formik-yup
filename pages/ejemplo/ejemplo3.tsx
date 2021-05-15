import {Formik, Form, Field, ErrorMessage} from 'formik'
import {TextField} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import * as Yup from 'yup'
import { useState } from 'react'

/**
 * https://formik.org/
 * Ejemplo #3
 * 
*/
export default function Ejemplo3Page(props){
    const initialValues = {
        nombre: '',
        email: '',
        direccion: '',
        region: {_id: 0, nombre: 'Seleccione una región'},
        comuna: {_id: 0, nombre: 'Seleccione una comuna'},
    }

    interface Comuna {
        _id: number,
        nombre: string,
        region: number 
    }

    interface Region {
        _id: number,
        nombre: string 
    }

    const regiones = [
        {_id: 1, nombre: 'Región Metropolitana'},
        {_id: 2, nombre: 'Región de Valparaíso'}
    ]

    const comunasTodas = [
        {_id: 1, nombre: 'Santiago', region: 1},
        {_id: 2, nombre: 'Pudahuel', region: 1},
        {_id: 3, nombre: 'Cerro Navia', region: 1},
        {_id: 4, nombre: 'La Florida', region: 1},
        {_id: 5, nombre: 'Quinta Normal', region: 1},
        {_id: 6, nombre: 'El Tabo', region: 2},
        {_id: 7, nombre: 'Algarrobo', region: 2},
        {_id: 8, nombre: 'Los Andes', region: 2},
        {_id: 9, nombre: 'San Felipe', region: 2},
        {_id: 10, nombre: 'Cartagena', region: 2}
    ]

    const filtrarComunas = (region) => comunasTodas.filter(c => c.region === region._id)

    const [comunas, setComunas] = useState([])

    /**
     * El método test() permite agregar una funcion personalizada a la cadena de validaciones
     * 
     * Más info de los métodos disponibles de YUP en:
     * https://github.com/jquense/yup
     */
    const validationSchema = Yup.object({
        nombre: Yup.string().min(5, "Debe colocar su nombre completo").max(20, "Su nombre excede el largo máximo permitido.").required("Requerido"),
        email: Yup.string().email("Email inválido").required("Requerido").test("email-organizacion", "Debe ser un correo de la empresa gmail.com", (value, context) => value?.includes('gmail.com')),
        direccion: Yup.string().required("La dirección es obligatoria").matches(/[a-zA-Z]{2,} [0-9]{2,}/, 'Debe especificar una dirección válida'),
        region: Yup.mixed().required("Requerido").test('region-existe', 'Debe escoger una región', (value, context) => regiones.map(r => r._id).includes(value?._id)),
        comuna: Yup.mixed().required("Requerido").test('comuna-existe', 'Debe escoger una comuna', (value, context) => comunas.map(c => c._id).includes(value?._id))
    })

    return (
        <div className="container p-5 bg-light">
            <h1 className="my-5">Formulario Ejemplo #3</h1>
            <p>Ejemplo de uso de Material React con Formik y Yup con actualización dinámica de comunas según región.</p>
            {/* Formik es un envoltorio de React Context */}
            <Formik 
                initialValues={ initialValues }
                validationSchema={ validationSchema }
                onSubmit={ (values) => console.log( JSON.stringify(values, null, 4) ) }
            >
                <Form>
                    <div className="form-group">
                        <Field name="nombre">
                            {({field, form: {touched, errors}, meta}) => (
                                <TextField label="Nombre" variant="filled" {...field} error={meta.touched && meta.error?true:false} helperText={meta.error} className="" />
                            )}
                        </Field>
                    </div>
                    
                    <div className="form-group">
                        <Field name="email">
                            {({field, form: {touched, errors}, meta}) => (
                                <TextField label="Email" variant="filled" {...field} error={meta.touched && meta.error?true:false} helperText={meta.error} className="" />
                            )}
                        </Field>
                    </div>

                    <div className="form-group">
                        <Field name="direccion">
                            {({field, form: {touched, errors}, meta}) => (
                                <TextField label="Direccion" variant="filled" {...field} error={meta.touched && meta.error?true:false} helperText={meta.error} className="" style={{width: '500px'}} />
                            )}
                        </Field>
                    </div>

                    <div className="form-group">
                        <Field name="region">
                            {({field, form, meta}) => (
                                <Autocomplete options={regiones} getOptionLabel={o => o.nombre} getOptionSelected={(o,v) => o?._id === v?._id} renderInput={params => <TextField label="Región" {...params} variant="filled" error={meta.touched && meta.error?true:false} helperText={meta.error} />} style={{width: '300px'}} onBlur={(e) => form.setFieldTouched('region', true)} onChange={(e,v) => {form.setFieldValue('region', v), setComunas( filtrarComunas(v) )}} />
                            )}
                        </Field>
                    </div>

                    <div className="form-group">
                        <Field name="comuna">
                            {({field, form, meta}) => (
                                <Autocomplete options={comunas} getOptionLabel={o => o.nombre} getOptionSelected={(o,v) => o?._id === v?._id} renderInput={params => <TextField label="Comuna" {...params} variant="filled" error={meta.touched && meta.error?true:false} helperText={meta.error} />} style={{width: '300px'}} onBlur={(e) => form.setFieldTouched('comuna', true)} onChange={(e,v) => form.setFieldValue('comuna', v)} />
                            )}
                        </Field>
                    </div>

                    <button className="btn btn-primary" type="submit">Guardar</button>
                </Form>
            </Formik>
        </div>
    )
}