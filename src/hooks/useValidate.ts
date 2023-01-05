import { isAddress } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'

import { parseInputType, validateName } from '@ensdomains/ensjs/utils/validation'

export const useValidate = (input: string, skip?: any) => {
  const [name, setNormalisedName] = useState('')
  const [valid, setValid] = useState<boolean | undefined>(undefined)
  const [type, setType] = useState<any>(undefined)

  useEffect(() => {
    if (!skip) {
      try {
        const normalisedName = validateName(decodeURIComponent(input))
        setNormalisedName(normalisedName)

        const inputType = parseInputType(normalisedName)
        setType(inputType.type)
        setValid(inputType.type !== 'unknown' && inputType.info !== 'unsupported')
      } catch {
        setValid(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, skip])

  return { valid, type, name, labelCount: name.split('.').length }
}

export const useValidateOrAddress = (input: string, skip?: any) => {
  const [inputIsAddress, setIsAddress] = useState(false)
  const { valid, type, name, labelCount } = useValidate(input, skip)

  useEffect(() => {
    if (!skip) {
      if (isAddress(input)) {
        setIsAddress(true)
      } else {
        setIsAddress(false)
      }
    }
  }, [input, skip])

  if (inputIsAddress) {
    return { valid: true, type: 'address', output: input }
  }

  return { valid, type, output: name, labelCount }
}
