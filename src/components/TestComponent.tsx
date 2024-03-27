'use client'
import { useEffect } from 'react'
import { getCoinsList } from '#/server-actions'

type TestComponentProps = {
  // someFunction: (...args: any) => Promise<void>
}

export const TestComponent: React.FC<TestComponentProps> = (
  {
    // someFunction,
  },
) => {
  useEffect(() => {
    const asyncFunc = async () => {
      const result = await getCoinsList({
        page: 1,
        perPage: 3,
      })
      console.log(result)
    }
    asyncFunc()
  }, [])

  return <div>TestComponent</div>
}
