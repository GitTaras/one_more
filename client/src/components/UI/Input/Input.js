import React from 'react';
import style from './Input.module.css';

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
    <div className={style.container}>
      {label && <label className="label">{label}</label>}
      <div className={style.inputContainer}>
        <input
          className={error ? style.inputDanger : ''}
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
        {error && <span className={style.error}>{error}</span>}
      </div>
    </div>
  </>
);
