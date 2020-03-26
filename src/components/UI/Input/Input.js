import React from 'react';
import StyledInput from 'styled-input';

export const Input = ({
  name,
  value,
  label,
  placeholder,
  type,
  autoFocus,
  error,
  onBlur,
  onChange,
  checked,
  required,
  ...rest
}) => (
  <>
    <StyledInput>
      {label && <label className="label">{label}</label>}
      <div className={'inputContainer'}>
        <input
          className={error ? 'inputDanger' : ''}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          checked={checked}
          autoFocus={autoFocus}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          {...rest}
        />
        {error && <span className={'error'}>{error}</span>}
      </div>
    </StyledInput>
  </>
);
