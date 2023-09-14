import Form from 'react-bootstrap/Form';

export default function FormField({ text, value, onChange, type, placeholder }){
     
    return (
        <Form.Group className="mb-3" >
            <Form.Label>{ text }</Form.Label>
            <Form.Control type={type} placeholder={placeholder}{...{ value, onChange, type }}  />
        </Form.Group>
    )
}