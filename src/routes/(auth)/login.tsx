import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/login')({
  component: LoginPage,
})

function LoginPage() {
  return <div style={{backgroundColor: 'blue', height: '200px', width: '200px'}}>This is Login Page</div>
}