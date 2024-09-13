import React from "react";
import { Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import { ISelectProps } from "../interfaces";
import Select from "react-select";

const SelectCtrl = ({
	control,
	showError,
	placeholder,
	name,
	required,
	disabled,
	id,
	startAdornment,
	endAdornment,
	startAdornmentIcon,
	endAdornmentIcon,
	label,
	options,
	onSelect,
	className = 'mb-3',
	formatOptionLabel = undefined
}: ISelectProps) => {
	const rules: any = {
		required: required,
		pattern: {
			value: /[A-Za-z0-9]{1,20}/,
			message: "Field is invalid",
		},
	};

	const onSelectHandler = (e: any) => {
		const value = e?.target?.value;
		let found;
		if (value && Number(value)) {
			found = options.find(option => Number(option.value) === Number(value));
		} else if (value) {
			found = options.find(option => option.value === value);
		}
		if (found && onSelect) {
			onSelect(found);
		}
	};

  const customSingleValue = ({ data }: any) => (
    <div className="d-flex  align-items-center">
      {data.icon ? <span className="me-2 ">{data.icon}</span> : ""}
      <span>{data.label}</span>
    </div>
  );
	return (
		<Controller
rules={rules}
name={name}
control={control}
key={name}
render={({ field, fieldState }) => (
  <>
	<Form.Group className={`${className}`}>
	  <Form.Label
		htmlFor={id}
		className={`${label === "" ? "d-none" : ""}`}
	  >
		{label} {required && <span className="text-danger">*</span>}
	  </Form.Label>
	  <Select
		{...field}
		inputId={id}
		isDisabled={disabled}
		placeholder={placeholder}
		options={options}
		value={options.find((o) => o.value === field.value) || null}
		onChange={(selectedOption :any) => {
		  if (selectedOption) {
			field.onChange(selectedOption.value);
			if (onSelect) {
			  onSelect(selectedOption);
			}
		  } else {
			field.onChange(null);
			if (onSelect) {
			  // @ts-ignore
			  onSelect(null);
			}
		  }
		}}
		isClearable
		styles={{
		  clearIndicator: (base:any) => ({
			...base,
			display: "none", 
		  }),
		}}
		formatOptionLabel={
		  formatOptionLabel ? formatOptionLabel : (item :any) => item.label
		}
	  />
	  {showError && showError(name) ? (
		<Form.Control.Feedback type="invalid" className="d-block">
		  {showError(name)}
		</Form.Control.Feedback>
	  ) : null}
	</Form.Group>
  </>
)}
></Controller>
	);
};

export default SelectCtrl;

