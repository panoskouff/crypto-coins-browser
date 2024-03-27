import { Space, Text } from '#/atoms'
import { TestComponent } from '#/components/TestComponent'

export default async function Home() {
  return (
    <div>
      <Text textStyle='title'>Home</Text>
      <Space h={10} />
      <TestComponent />
    </div>
  )
}
