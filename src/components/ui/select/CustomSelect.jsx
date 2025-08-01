import React, { forwardRef } from 'react'
import { Select } from './Select'

export const CustomSelect = forwardRef(
  ({ options, loading, placeholder, ...props }, ref) => {
    return (
      <Select ref={ref} {...props}>
        {loading ? (
          <option>{placeholder || 'Loading...'}</option>
        ) : (
          <>
            <option value=''>{placeholder || 'Select an option'}</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </>
        )}
      </Select>
    )
  }
)

CustomSelect.displayName = 'CustomSelect'
