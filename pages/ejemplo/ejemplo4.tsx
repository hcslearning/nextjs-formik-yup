import {Formik, Form, Field, ErrorMessage} from 'formik'
import {Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import * as Yup from 'yup'
import { useState } from 'react'

/**
 * https://formik.org/
 * Ejemplo #4 - Validación condicional (en referencia a campo hermano)
 * 
*/
export default function Ejemplo4Page(props){
    const initialValues = {
        nombre: '',
        direccion: '',
        documento: 'boleta',
        factura_rut: '',
        factura_razon_social: ''
    }

    const validationSchema = Yup.object({
        nombre: Yup.string().min(5, "Debe colocar su nombre completo").max(20, "Su nombre excede el largo máximo permitido.").required("Requerido"),
        direccion: Yup.string().required("La dirección es obligatoria").matches(/[a-zA-Z]{2,} [0-9]{2,}/, 'Debe especificar una dirección válida'),
        documento: Yup.string(),
        factura_rut: Yup.string()
            .when('documento', {
                is: 'factura',
                then: Yup.string().required("El RUT de la factura es obligatorio")
        }),
        factura_razon_social: Yup.string()
            .when('documento', {
                is: 'factura',
                then: Yup.string().required("La razón social es obligatoria")
        }),
    })

    return (
        <div className="container p-5 bg-light">
            <h1 className="my-5">Formulario Ejemplo #4</h1>
            <p>Ejemplo de uso de validación condicional en relación a campo hermano.</p>
            
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
                        <Field name="direccion">
                            {({field, form: {touched, errors}, meta}) => (
                                <TextField label="Direccion" variant="filled" {...field} error={meta.touched && meta.error?true:false} helperText={meta.error} className="" style={{width: '500px'}} />
                            )}
                        </Field>
                    </div>

                    <div className="form-group">
                        <Field name="documento">
                            {({field, form: {touched, errors}, meta}) => (
                                <FormControl component="fieldset" error={meta.error}>
                                    <FormLabel component="legend">Documento</FormLabel>
                                    <RadioGroup aria-label="documento" name="documento" {...field}>
                                        <FormControlLabel value="boleta" control={<Radio />} label="Boleta" />
                                        <FormControlLabel value="factura" control={<Radio />} label="Factura" />
                                    </RadioGroup>
                                    <FormHelperText>Escoja el tipo de documento tributario que desea que le emitamos por su compra.</FormHelperText>                                    
                              </FormControl>
                            )}
                        </Field>
                    </div>

                    <div className="form-group">
                        <Field name="factura_rut">
                            {({field, form: {touched, errors}, meta}) => (
                                <TextField label="RUT Factura" variant="filled" {...field} error={meta.touched && meta.error?true:false} helperText={meta.error} className="" style={{width: '500px'}} />
                            )}
                        </Field>
                    </div>

                    <div className="form-group">
                        <Field name="factura_razon_social">
                            {({field, form: {touched, errors}, meta}) => (
                                <TextField label="Razón Social" variant="filled" {...field} error={meta.touched && meta.error?true:false} helperText={meta.error} className="" style={{width: '500px'}} />
                            )}
                        </Field>
                    </div>
                    

                    <button className="btn btn-primary" type="submit">Guardar</button>
                </Form>
            </Formik>
        </div>
    )
}