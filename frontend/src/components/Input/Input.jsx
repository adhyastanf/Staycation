import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

export default function InputField({
    label, 
    name, 
    errors, 
    control,
    isPassword = false,
    defaultValue = '', 
    type = 'text',
    placeholder = '', 
}) {

    const inputComponent = (field, type) => {

        if(type === 'password'){
            return <Input.Password {...field} placeholder={placeholder} />
        }

        return <Input {...field} placeholder={placeholder} />
    }

    return (
      <Form.Item label={<b>{label?.toUpperCase()}</b>} validateStatus={errors.value ? 'error' : ''} help={errors.value?.message}>
        <Controller name={name} control={control} render={({ field }) => inputComponent(field, type) } />
      </Form.Item>
    );
  }