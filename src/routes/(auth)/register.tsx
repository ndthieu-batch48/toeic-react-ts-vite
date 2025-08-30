import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/register')({
  component: RegisterPage,
})

function RegisterPage() {
 return <div style={{backgroundColor: 'purple', height: '200px', width: '200px'}}>This is Register Page</div>
}
